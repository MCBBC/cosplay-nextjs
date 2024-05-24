const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");
const {
  users,
  tags,
  posts,
  post_views,
} = require("../app/lib/placeholder-data");

async function seedUsers(client) {
  try {
    await client.sql`create extension if not exists "uuid-ossp"`;
    // id uuid default uuid_generate_v4() primary key,
    const createTable = await client.sql`
        create table if not exists users (
            id BIGSERIAL PRIMARY KEY,
            name varchar(255) not null,
            email text not null unique,
            password text not null,
            created_at timestamptz default CURRENT_TIMESTAMP,
            updated_at timestamptz default CURRENT_TIMESTAMP,
            user_role int4 default 3
        )
        `;

    console.log("created users table");
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        insert into users (id,name,email,password,user_role)
        values (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.user_role})
        ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return { createTable, users: insertedUsers };
  } catch (error) {
    console.log("Error seeding users", error);
    throw error;
  }
}

async function seedTags(client) {
  try {
    await client.sql`create extension if not exists "uuid-ossp"`;
    const createTable = await client.sql`
            create table if not exists tags(
                id BIGSERIAL PRIMARY KEY,
                name varchar(255) not null,
                slug varchar(255) not null,
                description text,
                post_count int not null default 0
            )
            `;

    console.log("created tags table");
    const insertedTags = await Promise.all(
      tags.map(async (tag) => {
        return client.sql`
            insert into tags (id,name,slug,post_count)
            values (${tag.id}, ${tag.name}, ${tag.slug}, ${tag.post_count})
            ON CONFLICT (id) DO NOTHING;
            `;
      })
    );

    console.log(`Seeded ${insertedTags.length} tag`);

    return { createTable, tags: insertedTags };
  } catch (error) {
    console.log("Error seeding tags", error);
    throw error;
  }
}

async function seedPosts(client) {
  try {
    await client.sql`create extension if not exists "uuid-ossp"`;
    const createTable = await client.sql`
            create table if not exists posts(
                id BIGSERIAL PRIMARY KEY,
                title varchar(255) not null,
                tag_id int,
                content text not null,
                cover varchar,
                creation_date date DEFAULT CURRENT_DATE,
                view_count int4 DEFAULT 0,
                CONSTRAINT tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id)
            )
            `;

    console.log("created posts table");
    const insertedPosts = await Promise.all(
      posts.map(async (_post) => {
        return client.sql`
            insert into posts (id,title,tag_id,content,cover,creation_date,view_count)
            values (${_post.id}, ${_post.title}, ${_post.tag_id}, ${_post.content}, ${_post.cover}, ${_post.creation_date}, ${_post.view_count})
            ON CONFLICT (id) DO NOTHING;
            `;
      })
    );

    console.log(`Seeded ${insertedPosts.length} post`);
    return { createTable, insertedPosts };
  } catch (error) {
    console.log("Error seeding posts", error);
    throw error;
  }
}

async function seedPostViews(client) {
  try {
    await client.sql`create extension if not exists "uuid-ossp"`;
    const createTable = await client.sql`
            create table if not exists post_views(
                id BIGSERIAL PRIMARY KEY,
                post_id int,
                user_id int,
                ip varchar(255),
                created_at timestamptz not null default CURRENT_TIMESTAMP
            )
            `;

    console.log("created posts table");
    const insertedPostViews = await Promise.all(
      post_views.map(async (postView) => {
        return client.sql`
            insert into post_views (id,post_id,user_id,ip,created_at)
            values (${postView.id}, ${postView.post_id}, ${postView.user_id}, ${postView.ip}, ${postView.created_at})
            ON CONFLICT (id) DO NOTHING;
            `;
      })
    );

    console.log(`Seeded ${insertedPostViews.length} post`);
    return { createTable, insertedPostViews };
  } catch (error) {
    console.log("Error seeding post_views", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedTags(client);
  await seedPosts(client);
  await seedPostViews(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
