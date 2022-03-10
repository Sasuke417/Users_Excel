const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const xl = require("excel4node");
const userModel = require("./db/model").user;
require("dotenv").config();
require("./db/connection");

const app = express();
const server = http.createServer(app);

// Create a new instance of a Workbook class
var wb = new xl.Workbook();

// Add Worksheets to the workbook
var ws = wb.addWorksheet("Sheet 1");

ws.cell(1, 1).string("First Name");
ws.cell(1, 2).string("Last Name");
ws.cell(1, 3).string("email");
ws.cell(1, 4).string("phone number");
ws.cell(1, 5).string("address");
ws.cell(1, 6).string("gender");
ws.cell(1, 7).string("birth date");
ws.cell(1, 8).string("created on");

let column=["firstname","lastname","email","phonenumber","address","gender","birthdate","created_on"]

userModel.find({}, (err, docs) => {
  if (err) return console.error(err);
  for(let i=2;i<docs.length+2;i++){
      for(let j=0;j<8;j++){
        ws.cell(i,j+1).string(String(docs[i-2][column[j]]));
        wb.write("Excel.xlsx");
      }
  }
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World"));

app.route("/user").post((req, res) => {
  const input = req.body;
  const newUser = new userModel({
    firstname: input.firstname || "",
    lastname: input.lastname || "",
    email: input.email || "",
    phonenumber: input.phonenumber || 0,
    address: input.address || "",
    gender: input.gender || "",
    birthdate: new Date(input.birthdate),
    created_on: new Date(),
  });
  newUser.save((err, data) => {
    if (err) console.error(err);
    res.json(newUser);
  });
});

server.listen(3000, () => console.log("Listening on port: 3000"));
