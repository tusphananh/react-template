
const express = require("express");
const app = express();

app.get("/api/key",(req, res) => {
    res.send(JSON.stringify({ 
    ws : "wss://sbc03.tel4vn.com:7444",
    uri  : "107@2-test1.gcalls.vn:50061",
    password : "test1107"}));
})
// Port Environment variable
const PORT = process.env.PORT || 5000;

// Creating the node server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })
