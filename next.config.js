const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {(phase: string) => import('next').NextConfig} */
module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    ...(isDev ? {} : { distDir: 'dist' }),
    images: {
      unoptimized: true,
    },
  };
};
