-- CreateTable
CREATE TABLE "GithubEvent" (
    "id" SERIAL NOT NULL,
    "event_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "event_created_at" TIMESTAMP(3) NOT NULL,
    "public" BOOLEAN NOT NULL,
    "actor_id" TEXT NOT NULL,
    "actor" JSONB NOT NULL,
    "repo_id" TEXT NOT NULL,
    "repo" JSONB NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "GithubEvent_pkey" PRIMARY KEY ("id")
);
