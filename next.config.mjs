/** @type {import('next').NextConfig} */
// const remoteImgUrls = (process.env.IMG_REMOTW_URL ?? "")
//   .split(",")
//   .map((item) => ({ hostname: item }));
const nextConfig = {
  reactStrictMode: false,
  redirects: () => [
    {
      source: "/",
      destination: "/front",
      permanent: false, // 如果这是一个永久重定向，设置为 true
    },
  ],
  images: {
    // remotePatterns: [...remoteImgUrls],
  },
};

export default nextConfig;
