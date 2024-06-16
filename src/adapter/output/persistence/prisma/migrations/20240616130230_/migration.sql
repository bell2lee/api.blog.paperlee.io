-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostEvent" (
    "blogId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "message" JSONB NOT NULL,
    "meta" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostEvent_pkey" PRIMARY KEY ("blogId","id")
);

-- CreateTable
CREATE TABLE "PostAggregateVersion" (
    "blogId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "version" BIGINT NOT NULL,

    CONSTRAINT "PostAggregateVersion_pkey" PRIMARY KEY ("blogId","id")
);

-- CreateIndex
CREATE INDEX "PostEvent_blogId_postId_idx" ON "PostEvent"("blogId", "postId");
