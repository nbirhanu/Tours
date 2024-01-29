const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DBString = process.env.DBSTRING.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
