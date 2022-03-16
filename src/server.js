const dotenv = require("dotenv");
const app = require("./index");

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listen port ${port}`);
});

module.exports = { app };
