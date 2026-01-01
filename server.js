const express = require("express");
const { SerialPort } = require("serialport");
const cors = require("cors");

const app = express();
app.use(cors());

const port = new SerialPort({
  path: "/dev/cu.usbserial-110",
  baudRate: 9600,
});

app.get("/move/:angle", (req, res) => {
  const angle = req.params.angle;
  port.write(angle + "\n");
  res.send("OK");
});

app.listen(3000, () => {
  console.log("Server draait op http://localhost:3000");
});
