const securityHeaders = [
    {
        key: 'Referrer-Policy',
        value: 'unsafe-url',
    },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        outputStandalone: true,
    },
    images: {
        domains: ['storage.yandexcloud.net'],
    },
    // async headers() {
    //     return [
    //         {
    //             // Apply these headers to all routes in your application.
    //             source: '/:path*',
    //             headers: securityHeaders,
    //         },
    //     ];
    // },
};

module.exports = nextConfig;
