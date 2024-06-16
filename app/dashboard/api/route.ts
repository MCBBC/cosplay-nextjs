import { prisma } from "@/app/lib/prisma";
import fs from "fs";
import { parse } from "json2csv";

async function exportPostsToCsv() {
  const fields = [
    "id",
    "title",
    "coserId",
    "content",
    "cover",
    "creationDate",
    "viewCount",
    "status",
  ];
  try {
    const posts = await prisma.posts.findMany();
    const csv = parse(posts, { fields });
    fs.writeFileSync("posts.csv", csv);
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取 Cosplay 接口错误`);
  }
}

async function exportCosersToCsv() {
  const fields = [
    "id",
    "name",
    "slug",
    "description",
    "postCount",
    "coverImage",
    "backgroundImage",
  ];
  try {
    const cosers = await prisma.cosers.findMany();
    const csv = parse(cosers, { fields });
    fs.writeFileSync("cosers.csv", csv);
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取 Coser 接口错误`);
  }
}

async function exportUsersToCsv() {
  const fields = [
    "id",
    "name",
    "email",
    "password",
    "createdAt",
    "updatedAt",
    "userRole",
  ];
  try {
    const users = await prisma.users.findMany();
    const csv = parse(users, { fields });
    fs.writeFileSync("users.csv", csv);
  } catch (error) {
    console.log("数据库错误", error);
    throw new Error(`获取用户接口错误`);
  }
}

export async function POST() {
  await exportPostsToCsv();
  await exportCosersToCsv();
  await exportUsersToCsv();
  return { code: 200, msg: "传输成功" };
}
