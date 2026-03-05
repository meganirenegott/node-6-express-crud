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

// 1. getAllBooks()
// make a helper function that will get the name and description of all books
async function getAllBooks(){
    // read the data from books-data.json
    const data = await fs.readFile("books-data.json", "utf8");
    const parsedBooks = JSON.parse(data);
    console.log(parsedBooks)
    return parsedBooks;
}

// 2. getOneBook(index)
async function getOneBook(index) {
    const data = await fs.readFile("books-data.json", "utf8");
    const parsedBooks = JSON.parse(data);
    // console.log("index", index)
    // console.log(parsedBooks[index])
    // return parsedBooks;
    return parsedBooks[index];
}

// 3. getOneBookTitle(index)
async function getOneBookTitle(index) {
    const data = await fs.readFile("books-data.json", "utf8")
    const parsedBooks = JSON.parse(data);
    return parsedBooks[index].title;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-books
// make this async
app.get("/get-all-books", async(req, res) => {
    // call the helper function async style
    // get the name and description of each book
    const books = await getAllBooks();
    console.log("books", books)
    // res.send() sends the data
    // res.json() sends JSON data
    //  send the response
    res.json(books)
})
// 2. GET /get-one-book/:index

app.get("/get-one-book/:index", async (req, res) => {
    // get teh value of the dynamic parameter
    const index = req.params.index;
    // call the helper function
    const book = await getOneBook(index);
    // send the book as JSON in the response
    res.json(book);

    // send the book as JSON in the response

});

// 3. GET /get-one-book-title/:index — try writing this one yourself! 
app.get("/get-one-book-title/:index", async (req, res) => {
    // get the value of the dynamic paramete
    const index = req.params.index
    const bookTitle = await getOneBookTitle(index);
    res.json(bookTitle);
})