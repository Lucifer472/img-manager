/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.missiongujarat.in",
        port: "",
        pathname: "/i/**",
      },
    ],
  },
};

export default nextConfig;
