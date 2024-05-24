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
