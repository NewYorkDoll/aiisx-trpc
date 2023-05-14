package main

import (
	"context"
	"os"
	"site/cmd/db"
	"site/cmd/gh"

	_ "github.com/go-sql-driver/mysql"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	db.NewDB()

	GITHUB_ACCESS_TOKEN := os.Getenv("GITHUB_ACCESS_TOKEN")
	ctx := context.Background()
	gh.NewChient(ctx, GITHUB_ACCESS_TOKEN)
	gh.EventsRunner(ctx)

}
