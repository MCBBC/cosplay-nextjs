# Cosplay網站

本项目是由NextJs14构成的项目，部署到vercel上，数据库也是verlcel上的Postgres数据库。

## 数据库
数据库的表结构脚本运行在srcipts/seed.js。 数据库的默认数据填充文件，新建一个`app/lib/placeholder-data.js`文件，填充你的内容

```js
const users = [];
const tags = [];
const posts = [];
const post_views = [];
```

## 参数

```json
AUTH_SECRET="" // 随机的密钥


// vercel db上的数据库
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NO_SSL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER="default"
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""
```