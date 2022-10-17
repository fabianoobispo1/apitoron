require('dotenv/config');

/* module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
 */

/* module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'databaseingresso',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}; */

module.exports = {
  dialect: 'mysql',
  host: 'us-cdbr-east-06.cleardb.net',
  username: 'be3615913980eb',
  password: '19352c65',
  database: 'heroku_f0103f1b2a88073',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
