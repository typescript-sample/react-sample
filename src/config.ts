export const config = {
  authentication_url: 'http://localhost:8083',
  signup_url: 'http://localhost:8082/signup',
  password_url: 'http://localhost:8082/password',
  oauth2_url: 'http://localhost:8082/oauth2',

  user_url: 'http://localhost:8082/users',
  role_url: 'http://localhost:8083/roles',
  privilege_url: 'http://localhost:8083/privileges',
  audit_log_url: 'http://localhost:8083/audit-logs',
  item_url: 'http://localhost:9000/items',
  article_url: 'http://localhost:9000/articles'
};

export const env = {
  sit: {
    authentication_url: 'http://10.1.0.234:3003'
  },
  deploy: {
    authentication_url: '/server'
  }
};
  