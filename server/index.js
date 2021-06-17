
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// Port Environment variable
const PORT = process.env.PORT || 3060;

// Creating the node server
app.listen(PORT,'localhost', () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })
