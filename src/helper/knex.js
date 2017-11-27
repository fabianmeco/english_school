
module.exports = require('knex')({
    client: 'pg',
    connection: 'postgres://hvsajcgz:UzFIIGVODav8nFrCh6_tQN4h0F4uZ9fV@baasu.db.elephantsql.com:5432/hvsajcgz',
    searchPath: 'public',
    pool: {min:0, max:5}
});
