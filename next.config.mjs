/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => [
    {
      source: "/",
      destination: "/front",
      permanent: true, // 如果这是一个永久重定向，设置为 true
    },
  ],
};

export default nextConfig;
