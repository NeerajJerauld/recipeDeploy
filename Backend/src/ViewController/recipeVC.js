const express = require("express");
const router = express.Router;
const cuisine = require("../Model/recipeDB");

const create = async (req, res) => {
    console.log("Inside Create")

  try {
    const {
    description,
    cookingDuration,
    noOfServing,
    images
    } = req.body;
    const cuisineType = req.body.cuisineType.toLowerCase()
    const cuisineName = req.body.cuisineName.toLowerCase()
    const cuisineTypeRegex = new RegExp(cuisineType, "i");
    const cuisineNameRegex = new RegExp(cuisineName, "i");
    const descriptionRegex = new RegExp(description, "i");
    const imagesRegex = new RegExp(images, "i");
    console.log(cuisineType)
    if(!cuisine.schema.path('cuisineType').enumValues.includes(cuisineType)){
        return res.status(400).json({ error: 'Invalid cuisine type' });

    }
    const recipes = await cuisine.find({
      cuisineType: { $regex: cuisineType },
      noOfServing,
      cookingDuration,
      cuisineName: { $regex: cuisineNameRegex },
      description: { $regex: descriptionRegex },
      images: { $regex: imagesRegex },
    });
    console.log(recipes);

    if (recipes.length > 0) {
      console.log(
        "Recipes found:",
        recipes.map((recipe) => recipe.cuisineName)
      );
      res.json({
        message: "Recipe Already Exists",
        statusCode: 400,
        status: "failed to save",
        exists: true,
      });
    } else {
      var data = await new cuisine({cuisineType, cuisineName,description,cookingDuration,noOfServing,images});
      data.save();
      res.send({
        message: "Saved successfully",
        statusCode: 200,
        status: "data saved",
      });
      console.log("data saved");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


const readAll = async (req, res) => {
    console.log("Inside READALL")

    // res.send(
    //     "Inside READALL"
    // )
  try {
    var recipeData = await cuisine.find();

    if (recipeData.length === 0) {
        // return res.status(404).json({ status: "error", message: "No movies found" });
        return res.status(404).json({status: "error", message: "No recipe found"})
    }
      res.send({ status: "success", message: "successfully read all recipes" , data: recipeData});
    
      
  } catch (error) {
    res.status(500).send(error);
  }
};


const remove = async (req, res) => {
  try {
    const recipeName = req.params.id;

    const findRecipes = await cuisine.find({ cuisineName: recipeName });

    if (findRecipes.length === 0) {
      return res.status(404).json({
        message: "Recipe not found",
        statusCode: 404,
      });
    }

    const deletedRecipe = await cuisine.deleteMany({ cuisineName: recipeName });

    return res.status(200).json({
      message: "Recipe(s) successfully deleted",
      statusCode: 200,
      status: "Deleted",
      deletedItems: deletedRecipe,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      statusCode: 500,
    });
  }
};

const searchDocumentsByLetters = async (req,res) => {
    // res.send(
    //     "Inside SEARCH"
    // )
  try {
    let letters = req.params.letters
    console.log(req.params.letters);

    console.log(`Searching for documents with letters: ${letters}`);
    // const query = { actor: { $regex: `.*${letters}.*`, $options: 'i' } };
    const query = {
      $or: [
        { cuisineName: { $regex: `.*${letters}.*`, $options: 'i' } },
        { cuisineType: { $regex: `.*${letters}.*`, $options: 'i' } },
        { description: { $regex: `.*${letters}.*`, $options: 'i' } },

        // { releasedYear: { $in: letters } }

        // { releasedYear: { $regex: `.*${letters}.*`, $options: 'i' } }
      ]
    };
    const documents = await cuisine.find(query);
    console.log('Matching documents:', documents);
    res.send({data: documents})
  } catch (error) {
    console.error('Error searching documents:', error);
  }
}

const update = async (req, res) => {
    // res.send(
    //     "Inside UPDATE"
    // )
    try {
      const id = req.params.id;
      const updatedData = req.body;
  
      const updatedRecipe = await cuisine.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (updatedRecipe) {
        res.json({statusCode:200, status: "success", data: updatedRecipe });
      } else {
        res.status(404).json({statusCode:400, status: "error", message: "Recipe not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({statusCode:500, status: "error", message: "Internal server error" });
    }
  };



module.exports = { create, readAll, remove, update, searchDocumentsByLetters };
