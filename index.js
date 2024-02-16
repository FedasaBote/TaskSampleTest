const express = require("express");
const app = express();

app.use(express.json());
const port = 3000;
// model
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Create tasks.
let tasks = [];
let lastId = 1;
app.get("/tasks", (req, res) => {
  res.send(tasks);
});

app.post("/tasks", (req, res) => {
  const task = req.body;
  // check if the request body has title and description
  if (!task.title || !task.description) {
    res.status(400).send("Title and description are required");
    return;
  }
  const id = ++lastId;
  task.id = id;
  tasks.push(task);
  res.send(task);
});

//Read tasks.
app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id == id);
  if (task) {
    res.send(task);
  } else {
    res.status(404).send("Task not found");
  }
});

//Update tasks.
app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id == id);
  if (task) {
    task.title = req.body.title ? req.body.title : task.title;
    task.description = req.body.description
      ? req.body.description
      : task.description;
    res.send(task);
  } else {
    res.status(404).send("Task not found");
  }
});

//Delete tasks.

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter((task) => task.id != id);
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
