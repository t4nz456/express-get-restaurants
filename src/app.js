const express = require("express");
const app = express();
const router2 = require("/.routes/restaurants");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/restaurants", router2);








module.exports = app;