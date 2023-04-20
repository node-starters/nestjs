const pkg = require('./package.json');

module.exports = {
  apps: [
    {
      name: pkg.name,
      version: pkg.version,
      namespace: `app_${process.env.NODE_ENV}`,
      script: 'npm',
      args: ['run', 'start:prod'],
      watch: false,
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  ],
};
