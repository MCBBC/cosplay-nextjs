/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => [
    {
      source: "/",
      destination: "/front",
      permanent: true, // 如果这是一个永久重定向，设置为 true
    },
    {
      source: "/front/cosers",
      destination: "/front/cosers/1",
      permanent: true,
    },
    {
      source: "/front/cosplays",
      destination: "/front/cosplays/1",
      permanent: true,
    },
  ],
};

export default nextConfig;
