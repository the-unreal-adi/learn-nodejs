const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connection successfull');
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening at port ${port}... `);
});
