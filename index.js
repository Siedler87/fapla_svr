const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const BenutzerRouter = require("./routes/Benutzer/index.js");
const FamilienRouter = require("./routes/Familien/index.js");
var corsOptions = {
  origin: '*',
  credentials: true };
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/Benutzer", BenutzerRouter);
app.use("/Familien", FamilienRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});