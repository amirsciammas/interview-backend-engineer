const dotenv = require("dotenv");
const app = require("./index");
const sequelize = require("./src/configs/dbConfig");

dotenv.config();

sequelize
  .sync()
  .then(() => console.log(`Connected DBName:[${process.env.DB_FILE_NAME}]`))
  .catch((err) =>
    console.error(
      `Unable to connect DBName:[${process.env.DB_FILE_NAME}] Reason:[${err}]`
    )
  );

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`listen port ${port}`);
});
