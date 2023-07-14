const express = require("express");
const router = express.Router();

const { nanoid } = require("nanoid");

let tasks = [
  {
    id: nanoid(),
    title: "Work",
    text: "Do it!",
    done: false,
  },
];

// отримання списку всіх завдань
router.get("/tasks", (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      tasks,
    },
  });
});

// Обробник для отримання завдання по ID
router.get("/tasks/:id", (req, res, next) => {
  const { id } = req.params;
  const [task] = tasks.filter((el) => el.id === id);
  res.json({
    status: "success",
    code: 200,
    data: { task },
  });
});

// Створення нового завдання
router.post("/tasks", (req, res, next) => {
  const { title, text } = req.body;
  const task = {
    id: nanoid(),
    title,
    text,
    done: false,
  };

  tasks.push(task);

  res.status(201).json({
    status: "success",
    code: 201,
    data: { task },
  });
});

// Оновлення завдання
router.put("/tasks/:id", (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;
  const [task] = tasks.filter((el) => el.id === id);
  task.title = title;
  task.text = text;
  res.json({
    status: "success",
    code: 200,
    data: { task },
  });
});

// Часткове оновлення
// Для статусу ми використовуємо окремий URL та HTTP метод PATCH
router.patch("/tasks/:id/status", (req, res, next) => {
  const { id } = req.params;
  const { done } = req.body;
  const [task] = tasks.filter((el) => el.id === id);
  task.done = done;
  res.json({
    status: "success",
    code: 200,
    data: { task },
  });
});

// видалення завдання зі списку
router.delete("/tasks/:id", (req, res, next) => {
  const { id } = req.params;
  const newtasks = tasks.filter((el) => el.id !== id);
  tasks = [...newtasks];
  res.status(204).json();
});
