// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// import our node modules
import express from 'express';
import fs from 'fs/promises';

// declare app variable - creating a new instance of express for us to use
const app = express();

// define our port number
const port = 3000;

// tell our server what kind of data our server will be receiving and responding - JSON
app.use(express.json());

// turn on our server so it can listen and respond
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllRecipes()

async function getAllRecipes(){
    // read the data from books-data.json
    const data = await fs.readFile("recipes-data.json", "utf8");
    const parsedRecipes = JSON.parse(data);
    console.log(parsedRecipes)
    return parsedRecipes;
}

// 2. getOneRecipe(index)

async function getOneRecipe(index) {
    const data = await fs.readFile("recipes-data.json", "utf8");
    const parsedRecipe = JSON.parse(data);
    // console.log("index", index)
    // console.log(parsedBooks[index])
    // return parsedBooks;
    return parsedRecipe[index];
}


// 3. getAllRecipeNames()

async function getAllRecipeNames() {
    const data = await fs.readFile("recipes-data.json", "utf8")
    const parsedRecipe = JSON.parse(data);
    const recipeNames = [];
    const numOfRecipes = parsedRecipe.length;
    for (let i = 0; i < numOfRecipes; i++ ) {
        recipeNames.push(parsedRecipe[i].name);
    }
    return recipeNames;
}

// 4. getRecipesCount()

async function recipesCount() {
    const data = await fs.readFile("recipes-data.json", "utf8")
    const parsedRecipe = JSON.parse(data);
    return parsedRecipe.length;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes


app.get("/get-all-recipes", async (req, res) => {
    // call the helper function async style
    // get the name and description of each book
    const recipes = await getAllRecipes();
    console.log("recipes", recipes)
    // res.send() sends the data
    // res.json() sends JSON data
    //  send the response
    res.json(recipes)
})

// 2. GET /get-one-recipe/:index

app.get("/get-one-recipe/:index", async (req, res) => {
    // get teh value of the dynamic parameter
    const index = req.params.index;
    // call the helper function
    const recipe = await getOneRecipe(index);
    // send the book as JSON in the response
    res.json(recipe);

    // send the book as JSON in the response

});


// 3. GET /get-all-recipe-names

app.get("/get-all-recipe-names", async (req, res) => {
    // get the value of the dynamic parameter
    const recipeName = await getAllRecipeNames();
    res.json(recipeName);
})

// 4. GET /get-recipes-count

app.get("/get-recipes-count", async (req, res) => {
    const count = await recipesCount();
    res.json(count)
})