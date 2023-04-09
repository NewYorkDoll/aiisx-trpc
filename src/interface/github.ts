export interface GithubEvent {
  edges: EventEdge[];
  pageInfo: PageInfo;
  __typename: string;
}

export interface EventEdge {
  node: EventNode;
  __typename: string;
}

export interface EventNode {
  id: string;
  eventType: string;
  createdAt: string;
  actor: Actor;
  repo: Repo;
  payload: Payload;
  __typename: string;
}

export interface Actor {
  login: string;
  avatarURL: string;
  __typename: string;
}

export interface Repo {
  name: string;
  __typename: string;
}

export interface Payload {
  action?: string;
  number?: number;
  pull_request?: PullRequest;
  before?: string;
  commits: Commit[];
  distinct_size?: number;
  head: string;
  push_id?: number;
  ref?: string;
  repository_id?: number;
  size?: number;
  description: any;
  master_branch?: string;
  pusher_type?: string;
  ref_type?: string;
}

export interface PullRequest {
  _links: Links;
  active_lock_reason: any;
  additions: number;
  assignee: any;
  assignees: any[];
  author_association: string;
  auto_merge: any;
  base: Base;
  body: string;
  changed_files: number;
  closed_at: string;
  comments: number;
  comments_url: string;
  commits: number;
  commits_url: string;
  created_at: string;
  deletions: number;
  diff_url: string;
  draft: boolean;
  head: Head;
  html_url: string;
  id: number;
  issue_url: string;
  labels: Label[];
  locked: boolean;
  maintainer_can_modify: boolean;
  merge_commit_sha: string;
  mergeable: any;
  mergeable_state: string;
  merged: boolean;
  merged_at: string;
  merged_by: MergedBy;
  milestone: any;
  node_id: string;
  number: number;
  patch_url: string;
  rebaseable: any;
  requested_reviewers: any[];
  requested_teams: any[];
  review_comment_url: string;
  review_comments: number;
  review_comments_url: string;
  state: string;
  statuses_url: string;
  title: string;
  updated_at: string;
  url: string;
  user: User3;
}

export interface Links {
  comments: Comments;
  commits: Commits;
  html: Html;
  issue: Issue;
  review_comment: ReviewComment;
  review_comments: ReviewComments;
  self: Self;
  statuses: Statuses;
}

export interface Comments {
  href: string;
}

export interface Commits {
  href: string;
}

export interface Html {
  href: string;
}

export interface Issue {
  href: string;
}

export interface ReviewComment {
  href: string;
}

export interface ReviewComments {
  href: string;
}

export interface Self {
  href: string;
}

export interface Statuses {
  href: string;
}

export interface Base {
  label: string;
  ref: string;
  repo: Repo2;
  sha: string;
  user: User;
}

export interface Repo2 {
  allow_forking: boolean;
  archive_url: string;
  archived: boolean;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: string;
  default_branch: string;
  deployments_url: string;
  description: any;
  disabled: boolean;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks: number;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  has_discussions: boolean;
  has_downloads: boolean;
  has_issues: boolean;
  has_pages: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  homepage: any;
  hooks_url: string;
  html_url: string;
  id: number;
  is_template: boolean;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: string;
  languages_url: string;
  license: any;
  merges_url: string;
  milestones_url: string;
  mirror_url: any;
  name: string;
  node_id: string;
  notifications_url: string;
  open_issues: number;
  open_issues_count: number;
  owner: Owner;
  private: boolean;
  pulls_url: string;
  pushed_at: string;
  releases_url: string;
  size: number;
  ssh_url: string;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  topics: any[];
  trees_url: string;
  updated_at: string;
  url: string;
  visibility: string;
  watchers: number;
  watchers_count: number;
  web_commit_signoff_required: boolean;
}

export interface Owner {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface User {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface Head {
  label: string;
  ref: string;
  repo: Repo3;
  sha: string;
  user: User2;
}

export interface Repo3 {
  allow_forking: boolean;
  archive_url: string;
  archived: boolean;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: string;
  default_branch: string;
  deployments_url: string;
  description: any;
  disabled: boolean;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks: number;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  has_discussions: boolean;
  has_downloads: boolean;
  has_issues: boolean;
  has_pages: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  homepage: any;
  hooks_url: string;
  html_url: string;
  id: number;
  is_template: boolean;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: string;
  languages_url: string;
  license: any;
  merges_url: string;
  milestones_url: string;
  mirror_url: any;
  name: string;
  node_id: string;
  notifications_url: string;
  open_issues: number;
  open_issues_count: number;
  owner: Owner2;
  private: boolean;
  pulls_url: string;
  pushed_at: string;
  releases_url: string;
  size: number;
  ssh_url: string;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  topics: any[];
  trees_url: string;
  updated_at: string;
  url: string;
  visibility: string;
  watchers: number;
  watchers_count: number;
  web_commit_signoff_required: boolean;
}

export interface Owner2 {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface User2 {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface Label {
  color: string;
  default: boolean;
  description: string;
  id: number;
  name: string;
  node_id: string;
  url: string;
}

export interface MergedBy {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface User3 {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface Commit {
  author: Author;
  distinct: boolean;
  message: string;
  sha: string;
  url: string;
}

export interface Author {
  email: string;
  name: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
  __typename: string;
}
