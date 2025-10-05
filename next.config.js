// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "xlsfmgwgynfcunecrzvj.supabase.co",
                pathname: "/storage/v1/object/public/**", // allow all public storage objects
            },
        ],
    },
}

module.exports = nextConfig
