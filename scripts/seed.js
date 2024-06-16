const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const {
  users,
  cosers,
  posts,
  post_views,
} = require("../app/lib/placeholder-data");
const prisma = new PrismaClient();
async function seed() {
  // 种子用户
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  // 种子cosers
  for (const coser of cosers) {
    await prisma.coser.create({
      data: coser,
    });
  }

  // 种子posts
  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }

  // 种子postViews
  for (const postView of postViews) {
    await prisma.postView.create({
      data: postView,
    });
  }

  console.log("数据库种子数据填充完成。");
}

seed()
  .catch((e) => {
    console.error("在填充数据库时发生错误:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
