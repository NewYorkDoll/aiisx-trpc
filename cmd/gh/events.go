package gh

import (
	"context"
	"encoding/json"
	"site/cmd/db"
	"time"

	"github.com/google/go-github/v52/github"
)

const eventsInterval = 30 * time.Minute

var allowedEvents = []string{
	"CreateEvent",
	"DeleteEvent",
	"ForkEvent",
	"IssueCommentEvent",
	"IssuesEvent",
	"MemberEvent",
	"PublicEvent",
	"PullRequestEvent",
	"PullRequestReviewEvent",
	"PullRequestReviewCommentEvent",
	"PullRequestReviewThreadEvent",
	"PushEvent",
	"ReleaseEvent",
	"WatchEvent",
}

func EventsRunner(ctx context.Context) {
	if SyncOnStart {
		err := getEvents(ctx)
		if err != nil {
			println("Error getting events: ", err.Error())
		}
	}
}

func getEvents(ctx context.Context) error {
	opts := &github.ListOptions{
		PerPage: 100,
		Page:    1,
	}
	var allEvents []*github.Event
	var resp *github.Response
	var user *github.User
	user, _, err := Client.Users.Get(ctx, "")
	if err != nil {
		println("Error getting user: ", err.Error())
		return err
	}

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}

		time.Sleep(5 * time.Second)

		var events []*github.Event

		events, resp, err = Client.Activity.ListEventsPerformedByUser(ctx, user.GetLogin(), false, opts)
		if err != nil {
			return err
		}

		for _, event := range events {
			isAllowed := false
			for _, allowed := range allowedEvents {
				if event.GetType() == allowed {
					isAllowed = true
					break
				}
			}

			if !isAllowed {
				continue
			}

			allEvents = append(allEvents, event)
		}

		if resp.NextPage < 1 {
			break
		}
		opts.Page = resp.NextPage
	}

	var exists bool
	var count int

	for _, event := range allEvents {

		err := db.DB.QueryRow("SELECT EXISTS(SELECT id FROM github_events WHERE event_id = ?)", event.GetID()).Scan(&exists)

		if err != nil {
			return err
		}

		if exists {
			continue
		}

		payload := map[string]interface{}{}
		err = json.Unmarshal([]byte(event.GetRawPayload()), &payload)
		if err != nil {
			return err
		}

		count++

		_, err = db.DB.Exec("INSERT INTO events (id, type, createdAt, public, actorID, actor, repoID, repo,payload) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)",
			event.GetID(), event.GetType(), event.GetCreatedAt(), event.GetPublic(), event.GetActor().GetID(), event.GetActor(),
			event.GetRepo().GetID(), event.GetRepo(), payload,
		)
		if err != nil {
			return err
		}

	}

	println("Inserted ", count, " events")

	return nil
}
