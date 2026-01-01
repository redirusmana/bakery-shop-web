/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com", // Izinkan gambar dari Shopify
      },
      {
        protocol: "https",
        hostname: "placehold.co", // Jaga-jaga buat dummy image
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
