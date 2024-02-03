-- CreateTable
CREATE TABLE "BlogEntity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BlogEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostEntity" (
    "blogId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostEntity_pkey" PRIMARY KEY ("blogId","id")
);

-- CreateTable
CREATE TABLE "PostCommentEntity" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostCommentEntity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostEntity_id_key" ON "PostEntity"("id");

-- AddForeignKey
ALTER TABLE "PostCommentEntity" ADD CONSTRAINT "PostCommentEntity_postId_fkey" FOREIGN KEY ("postId") REFERENCES "PostEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
