const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const moment = require("moment");
const port = 6969;

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://khachiep:khachiep12@cluster0.75k6z.mongodb.net/managementVaccine?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(console.error);

const Login = require("./models/Login");
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Admin

app.get("/admin", async (req, res) => {
  const data = await Login.find();
  res.json(data);
});

app.post("/admin/new", (req, res) => {
  const login = new Login({
    username: req.body.username,
    password: req.body.password,
  });
  login.save();

  res.json(login);
});

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await Login.findOne({ username });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    if (user.password !== password) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//Username
const User = require("./models/User");
app.post("/user/new", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  user.save();

  res.json(user);
});

app.delete("/user/delete/:_id", async (req, res) => {
  const result = await User.findByIdAndDelete(req.params._id);
  res.json(result);
});

app.get("/user", async (req, res) => {
  const data = await User.find();
  res.json(data);
});

app.get("/user/:id", async (req, res) => {
  const result = await User.findById(req.params.id);
  res.json(result);
});

app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    if (user.password !== password) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.put("/user/update/:id", async (req, res) => {
  const result = await User.findByIdAndUpdate(req.params.id, {
    password: req.body.password,
  });
  res.json(result);
});

// User_inject
const List_inject = require("./models/List_inject");
app.post("/inject/new", (req, res) => {
  const list_inject = new List_inject({
    name: req.body.name,
    inject: req.body.inject,
    birthday: req.body.birthday,
    sex: req.body.sex,
    phone: req.body.phone,
    email: req.body.email,
    adress: req.body.adress,
    city: req.body.city,
    date_inject: req.body.date_inject,
    shift: req.body.shift,
    vaccine: req.body.vaccine,
  });
  list_inject.save();

  res.json(list_inject);
});

app.get("/inject", async (req, res) => {
  const data = await List_inject.find(req.query);
  res.json(data);
});

app.delete("/inject/delete/:_id", async (req, res) => {
  const result = await List_inject.findByIdAndDelete(req.params._id);
  res.json(result);
});

app.put("/inject/update/:id", async (req, res) => {
  const result = await List_inject.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    inject: req.body.inject,
    sex: req.body.sex,
    phone: req.body.phone,
    email: req.body.email,
    adress: req.body.adress,
    city: req.body.city,
    date_inject: req.body.date_inject,
    shift: req.body.shift,
    vaccine: req.body.vaccine,
  });
  res.json(result);
});

app.get("/inject/:id", async (req, res) => {
  const result = await List_inject.findById(req.params.id);
  res.json(result);
});

//Vaccine covid

const Vaccine = require("./models/Vaccine");

app.post("/vaccine/new", (req, res) => {
  const vaccine = new Vaccine({
    nameVaccine: req.body.nameVaccine,
    quantily: req.body.quantily,
  });
  vaccine.save();

  res.json(vaccine);
});

app.get("/vaccine", async (req, res) => {
  const data = await Vaccine.find();
  res.json(data);
});

app.delete("/vaccine/delete/:_id", async (req, res) => {
  const result = await Vaccine.findByIdAndDelete(req.params._id);
  res.json(result);
});
