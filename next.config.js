// Remove this if you're not using Fullcalendar features
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline'
]);

module.exports = withTM({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/applications',
        permanent: true
      },
      {
        source: '/administration',
        destination: '/administration/organization',
        permanent: true
      },
      {
        source: '/dashboard',
        destination: '/dashboard/reports',
        permanent: true
      },
      {
        source: '/dashboard/onboarding',
        destination: '/dashboard/onboarding/vertical',
        permanent: true
      },
      {
        source: '/docs',
        destination: '/docs/welcome',
        permanent: true
      }
    ];
  }
});
