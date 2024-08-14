-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_role" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "coser_id" INTEGER,
    "content" TEXT NOT NULL,
    "cover" TEXT,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cosers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "post_count" INTEGER NOT NULL DEFAULT 0,
    "avatar" TEXT DEFAULT '',
    "background_image" TEXT DEFAULT '',

    CONSTRAINT "cosers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_posts_coser_id" ON "posts"("coser_id");

-- CreateIndex
CREATE INDEX "idx_posts_creation_date_id" ON "posts"("creation_date", "id");

-- CreateIndex
CREATE INDEX "idx_cosers_name" ON "cosers"("name");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_coser_id_fkey" FOREIGN KEY ("coser_id") REFERENCES "cosers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
