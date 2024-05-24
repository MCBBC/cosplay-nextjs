const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");
const {users,tags,posts,post_views} = require('../app/lib/placeholder-data');

async function seedUsers(client){
    try {
        await client.sql`create extension if not exists "uuid-ossp"`;
        const createTable = await client.sql``
    } catch (error) {
        
    }
}