const express = require("express");
const student = require("./data.json");
const app = express();
app.use(express.json());
const cors = require("cors");
const fs = require("fs");
const exp = require("constants");

const port = 8000;
app.use(cors());

app.get("/student", (req, res) => {
  return res.json(student);
});

app.delete("/student/:id", (req, res) => {
  let id = Number(req.params.id);
  console.log(id);
  let filteredStudent = student.filter((data) => data.id !== id);
  fs.writeFile("./data.json", JSON.stringify(filteredStudent), (err, data) => {
    return res.json(filteredStudent);
  });
});

app.post("/student", (req, res) => {
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    res.status(400).json({ message: "All fields required" });
  }

  let id = Date.now();
  console.log(id, "id");
  student.push({ id, name, age, city });
  fs.writeFile("./data.json", JSON.stringify(student), (err, data) => {
    return res.json({ message: "Student detail added successfully" });
  });
});

app.patch("/student/:id", (req, res) => {
  let id = Number(req.params.id);

  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    res.status(400).json({ message: "All fields required" });
  }

  let index = student.findIndex((data) => data.id === id);

  student.splice(index, 1, { ...req.body });

  fs.writeFile("./data.json", JSON.stringify(student), (err, data) => {
    return res.json({ message: "Student detail updated successfully" });
  });
});
app.listen(port, (err) => {
  console.log(`server is running on port ${port}`);
});
