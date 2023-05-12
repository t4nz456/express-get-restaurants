const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})

app.get("/restaurants/:id", async (req, res) => {
    const data = req.params.id;
    const find = await Restaurant.findByPk(data);
    res.json(find);
})

app.post("/restaurants", async (req, res) => {
    const data =  await Restaurant.create(req.body);
    res.json(data);
})

app.put("/restaurants/:id", async (req, res) => {
    const find = await Restaurant.update(req.body, {where: {id: req.params.id}});
    res.json(find);
})

app.delete("/restaurants/:id", async (req, res) => {
    const data = await Restaurant.destroy({where: {id: req.params.id}});
    res.json(data);
})






module.exports = app;