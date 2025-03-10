module.exports = {
    apps: [
      {
        name: 'proyecto-final',
        script: 'index.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'development',
          PORT: 3000,
          USE_HTTPS: 'false'
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 3000,
          USE_HTTPS: 'true'
        }
      }
    ]
  };