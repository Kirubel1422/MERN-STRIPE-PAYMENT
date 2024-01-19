require("dotenv").config();

const express = require("express");
const cors = require("cors");
const paymentRouter = require("./routes/main.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/payment", paymentRouter);
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
