const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");
const {
  users,
  cosers,
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

async function seedCosers(client) {
  try {
    await client.sql`create extension if not exists "uuid-ossp"`;
    const createTable = await client.sql`
            create table if not exists cosers(
                id BIGSERIAL PRIMARY KEY,
                name varchar(255) not null,
                slug varchar(255) not null,
                description text,
                post_count int not null default 0
            );
            create index if not exists idx_cosers_name on cosers(name);
            `;

    console.log("created cosers table");
    const insertedCosers = await Promise.all(
      cosers.map(async (tag) => {
        return client.sql`
            insert into cosers (id,name,slug,post_count)
            values (${tag.id}, ${tag.name}, ${tag.slug}, ${tag.post_count})
            ON CONFLICT (id) DO NOTHING;
            `;
      })
    );

    console.log(`Seeded ${insertedCosers.length} tag`);

    return { createTable, cosers: insertedCosers };
  } catch (error) {
    console.log("Error seeding cosers", error);
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
                coser_id int,
                content text not null,
                cover varchar,
                creation_date date DEFAULT CURRENT_DATE,
                view_count int4 DEFAULT 0,
                CONSTRAINT tag_id_fkey FOREIGN KEY (coser_id) REFERENCES public.cosers(id)
            );
            CREATE INDEX IF NOT EXISTS idx_posts_coser_id ON posts(coser_id);
            CREATE INDEX IF NOT EXISTS idx_posts_creation_date_id ON posts(creation_date DESC, id DESC);
            `;

    console.log("created posts table");
    const insertedPosts = await Promise.all(
      posts.map(async (_post) => {
        return client.sql`
            insert into posts (id,title,coser_id,content,cover,creation_date,view_count)
            values (${_post.id}, ${_post.title}, ${_post.coser_id}, ${_post.content}, ${_post.cover}, ${_post.creation_date}, ${_post.view_count})
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
            );
            CREATE INDEX IF NOT EXISTS idx_post_views_post_id_created_at ON post_views(post_id, created_at); 
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
  await seedCosers(client);
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
