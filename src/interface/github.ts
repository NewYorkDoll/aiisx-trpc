export interface GithubEvent {
  id: string;
  event_id: string;
  event_type: string;
  created_at: string;
  public: boolean;
  actor_id: string;
  actor: Actor;
  repo_id: string;
  repo: Repo;
  payload: Payload;
}

export interface Actor {
  id: number;
  url: string;
  login: string;
  avatar_url: string;
  gravatar_id: string;
}

export interface Repo {
  id: number;
  url: string;
  name: string;
}

export interface Payload {
  ref?: string;
  head?: string;
  size?: number;
  before?: string;
  commits?: Commit[];
  push_id?: number;
  distinct_size?: number;
  repository_id?: number;
  action?: string;
  number?: number;
  pull_request?: PullRequest;
  ref_type?: string;
  description: any;
  pusher_type?: string;
  master_branch?: string;
}

export interface Commit {
  sha: string;
  url: string;
  author: Author;
  message: string;
  distinct: boolean;
}

export interface Author {
  name: string;
  email: string;
}

export interface PullRequest {
  id: number;
  url: string;
  base: Base;
  body: string;
  head: Head;
  user: User3;
  draft: boolean;
  state: string;
  title: string;
  _links: Links;
  labels: Label[];
  locked: boolean;
  merged: boolean;
  number: number;
  commits: number;
  node_id: string;
  assignee: any;
  comments: number;
  diff_url: string;
  html_url: string;
  additions: number;
  assignees: any[];
  closed_at: string;
  deletions: number;
  issue_url: string;
  mergeable: any;
  merged_at: string;
  merged_by: MergedBy;
  milestone: any;
  patch_url: string;
  auto_merge: any;
  created_at: string;
  rebaseable: any;
  updated_at: string;
  commits_url: string;
  comments_url: string;
  statuses_url: string;
  changed_files: number;
  mergeable_state: string;
  requested_teams: any[];
  review_comments: number;
  merge_commit_sha: string;
  active_lock_reason: any;
  author_association: string;
  review_comment_url: string;
  requested_reviewers: any[];
  review_comments_url: string;
  maintainer_can_modify: boolean;
}

export interface Base {
  ref: string;
  sha: string;
  repo: Repo2;
  user: User;
  label: string;
}

export interface Repo2 {
  id: number;
  url: string;
  fork: boolean;
  name: string;
  size: number;
  forks: number;
  owner: Owner;
  topics: any[];
  git_url: string;
  license: any;
  node_id: string;
  private: boolean;
  ssh_url: string;
  svn_url: string;
  archived: boolean;
  disabled: boolean;
  has_wiki: boolean;
  homepage: any;
  html_url: string;
  keys_url: string;
  language: string;
  tags_url: string;
  watchers: number;
  blobs_url: string;
  clone_url: string;
  forks_url: string;
  full_name: string;
  has_pages: boolean;
  hooks_url: string;
  pulls_url: string;
  pushed_at: string;
  teams_url: string;
  trees_url: string;
  created_at: string;
  events_url: string;
  has_issues: boolean;
  issues_url: string;
  labels_url: string;
  merges_url: string;
  mirror_url: any;
  updated_at: string;
  visibility: string;
  archive_url: string;
  commits_url: string;
  compare_url: string;
  description: any;
  forks_count: number;
  is_template: boolean;
  open_issues: number;
  branches_url: string;
  comments_url: string;
  contents_url: string;
  git_refs_url: string;
  git_tags_url: string;
  has_projects: boolean;
  releases_url: string;
  statuses_url: string;
  allow_forking: boolean;
  assignees_url: string;
  downloads_url: string;
  has_downloads: boolean;
  languages_url: string;
  default_branch: string;
  milestones_url: string;
  stargazers_url: string;
  watchers_count: number;
  deployments_url: string;
  git_commits_url: string;
  has_discussions: boolean;
  subscribers_url: string;
  contributors_url: string;
  issue_events_url: string;
  stargazers_count: number;
  subscription_url: string;
  collaborators_url: string;
  issue_comment_url: string;
  notifications_url: string;
  open_issues_count: number;
  web_commit_signoff_required: boolean;
}

export interface Owner {
  id: number;
  url: string;
  type: string;
  login: string;
  node_id: string;
  html_url: string;
  gists_url: string;
  repos_url: string;
  avatar_url: string;
  events_url: string;
  site_admin: boolean;
  gravatar_id: string;
  starred_url: string;
  followers_url: string;
  following_url: string;
  organizations_url: string;
  subscriptions_url: string;
  received_events_url: string;
}

export interface User {
  id: number;
  url: string;
  type: string;
  login: string;
  node_id: string;
  html_url: string;
  gists_url: string;
  repos_url: string;
  avatar_url: string;
  events_url: string;
  site_admin: boolean;
  gravatar_id: string;
  starred_url: string;
  followers_url: string;
  following_url: string;
  organizations_url: string;
  subscriptions_url: string;
  received_events_url: string;
}

export interface Head {
  ref: string;
  sha: string;
  repo: Repo3;
  user: User2;
  label: string;
}

export interface Repo3 {
  id: number;
  url: string;
  fork: boolean;
  name: string;
  size: number;
  forks: number;
  owner: Owner2;
  topics: any[];
  git_url: string;
  license: any;
  node_id: string;
  private: boolean;
  ssh_url: string;
  svn_url: string;
  archived: boolean;
  disabled: boolean;
  has_wiki: boolean;
  homepage: any;
  html_url: string;
  keys_url: string;
  language: string;
  tags_url: string;
  watchers: number;
  blobs_url: string;
  clone_url: string;
  forks_url: string;
  full_name: string;
  has_pages: boolean;
  hooks_url: string;
  pulls_url: string;
  pushed_at: string;
  teams_url: string;
  trees_url: string;
  created_at: string;
  events_url: string;
  has_issues: boolean;
  issues_url: string;
  labels_url: string;
  merges_url: string;
  mirror_url: any;
  updated_at: string;
  visibility: string;
  archive_url: string;
  commits_url: string;
  compare_url: string;
  description: any;
  forks_count: number;
  is_template: boolean;
  open_issues: number;
  branches_url: string;
  comments_url: string;
  contents_url: string;
  git_refs_url: string;
  git_tags_url: string;
  has_projects: boolean;
  releases_url: string;
  statuses_url: string;
  allow_forking: boolean;
  assignees_url: string;
  downloads_url: string;
  has_downloads: boolean;
  languages_url: string;
  default_branch: string;
  milestones_url: string;
  stargazers_url: string;
  watchers_count: number;
  deployments_url: string;
  git_commits_url: string;
  has_discussions: boolean;
  subscribers_url: string;
  contributors_url: string;
  issue_events_url: string;
  stargazers_count: number;
  subscription_url: string;
  collaborators_url: string;
  issue_comment_url: string;
  notifications_url: string;
  open_issues_count: number;
  web_commit_signoff_required: boolean;
}

export interface Owner2 {
  id: number;
  url: string;
  type: string;
  login: string;
  node_id: string;
  html_url: string;
  gists_url: string;
  repos_url: string;
  avatar_url: string;
  events_url: string;
  site_admin: boolean;
  gravatar_id: string;
  starred_url: string;
  followers_url: string;
  following_url: string;
  organizations_url: string;
  subscriptions_url: string;
  received_events_url: string;
}

export interface User2 {
  id: number;
  url: string;
  type: string;
  login: string;
  node_id: string;
  html_url: string;
  gists_url: string;
  repos_url: string;
  avatar_url: string;
  events_url: string;
  site_admin: boolean;
  gravatar_id: string;
  starred_url: string;
  followers_url: string;
  following_url: string;
  organizations_url: string;
  subscriptions_url: string;
  received_events_url: string;
}

export interface User3 {
  id: number;
  url: string;
  type: string;
  login: string;
  node_id: string;
  html_url: string;
  gists_url: string;
  repos_url: string;
  avatar_url: string;
  events_url: string;
  site_admin: boolean;
  gravatar_id: string;
  starred_url: string;
  followers_url: string;
  following_url: string;
  organizations_url: string;
  subscriptions_url: string;
  received_events_url: string;
}

export interface Links {
  html: Html;
  self: Self;
  issue: Issue;
  commits: Commits;
  comments: Comments;
  statuses: Statuses;
  review_comment: ReviewComment;
  review_comments: ReviewComments;
}

export interface Html {
  href: string;
}

export interface Self {
  href: string;
}

export interface Issue {
  href: string;
}

export interface Commits {
  href: string;
}

export interface Comments {
  href: string;
}

export interface Statuses {
  href: string;
}

export interface ReviewComment {
  href: string;
}

export interface ReviewComments {
  href: string;
}

export interface Label {
  id: number;
  url: string;
  name: string;
  color: string;
  default: boolean;
  node_id: string;
  description: string;
}

export interface MergedBy {
  id: number;
  url: string;
  type: string;
  login: string;
  node_id: string;
  html_url: string;
  gists_url: string;
  repos_url: string;
  avatar_url: string;
  events_url: string;
  site_admin: boolean;
  gravatar_id: string;
  starred_url: string;
  followers_url: string;
  following_url: string;
  organizations_url: string;
  subscriptions_url: string;
  received_events_url: string;
}
