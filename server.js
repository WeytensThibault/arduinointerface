const express = require("express");
const { SerialPort } = require("serialport");
const cors = require("cors");

const app = express();
app.use(cors());

const port = new SerialPort({
  path: "/dev/cu.usbserial-110",
  baudRate: 9600,
});

app.get("/move/:servo/:angle", (req, res) => {
  const servo = req.params.servo;
  const angle = req.params.angle;

  // Send format: "servo,angle" (e.g., "1,90")
  const command = `${servo},${angle}`;

  port.write(command + "\n");
  console.log(`Sent: Servo ${servo} to ${angle}°`);
  res.send(`Servo ${servo} moved to ${angle}°`);
});

app.listen(3000, () => {
  console.log("Server draait op http://localhost:3000");
});
