// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://hvsajcgz:UzFIIGVODav8nFrCh6_tQN4h0F4uZ9fV@baasu.db.elephantsql.com:5432/hvsajcgz',
    searchPath: 'public'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
