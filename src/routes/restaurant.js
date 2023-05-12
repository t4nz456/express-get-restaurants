const express = require("express");
const Restaurant = require("../../models");
const router = express.Router();

router.get("/", async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})


router.post("/", async (req, res) => {
    const data =  await Restaurant.create(req.body);
    res.json(data);
})

router.put("/:id", async (req, res) => {
    const find = await Restaurant.update(req.body, {where: {id: req.params.id}});
    res.json(find);
})

router.delete("/:id", async (req, res) => {
    const data = await Restaurant.destroy({where: {id: req.params.id}});
    res.json(data);
})

module.exports = router;