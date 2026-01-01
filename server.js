const express = require("express");
const { SerialPort } = require("serialport");
const cors = require("cors");
const { log } = require("three");

const app = express();
app.use(cors());

const port = new SerialPort({
  path: "/dev/cu.usbserial-110",
  baudRate: 9600,
});

app.get("/move/:command", (req, res) => {
  const command = req.params.command;
  // console.log("Ontvangen commando:", req.params.command);
  let angle;

  angle = parseInt(command); // Direct angle control

  port.write(angle + "\n");
  res.send(`Command: ${command}, Angle: ${angle}`);
});

app.listen(3000, () => {
  console.log("Server draait op http://localhost:3000");
});
