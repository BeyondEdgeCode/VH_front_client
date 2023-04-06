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
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
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
    // headers: {
    //     key: 'Referrer-Policy',
    //     value: 'unsafe-url',
    // },
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: 'http://100.115.34.49/:path*',
    //         },
    //     ];
    // },
};
//100.115.34.49/:path*

module.exports = nextConfig;
