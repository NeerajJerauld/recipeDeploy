const express = require("express");
const router = express.Router();
const { create, readAll, remove, update,searchDocumentsByLetters } = require("../ViewController/recipeVC");

//ADD MOVIES
router.post("/addRecipe", create);

//READ ALL MOVIES

router.get("/readAllRecipes",readAll);

//DELETE MOVIES

router.delete("/removeRecipe/:id", remove);

//UPDATE MOVIES
router.put("/updateRecipe/:id", update);

//search
router.get('/search/:letters',searchDocumentsByLetters)

module.exports = router;
