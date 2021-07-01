///framework
const express= require("express");


//database
const database=require("./database/index");

//initialising express
const shapeAI= express();
 //hello change
shapeAI.get("/",(req,res)=>{
    return res.json({books:database.books});

});


shapeAI.use(express.json());
/*
Route           /
description     get all books
access          PUBLIC
Parameters       NONE
Method           GET

*/

shapeAI.get("/",(req,res)=>{
    return res.json({books:database.books});

});
/*
Route           /
description     get all books
access          PUBLIC
Parameters       ISBN
Method           GET

*/
shapeAI.get("/is/:isbn",(req,res)=>{
    const getSpecificBook=database.books.filter(
        (book)=>book.ISBN ===req.params.isbn
    );
    if(getSpecificBook.length===0){
        return res.json({
            error:`No book found for the ISBN of ${req.params.isbn}`,
        });
    }
    return res.json({book:getSpecificBook});
});
/*
Route           /
description     get specific books based on category
access          PUBLIC
Parameters      CATEGORY
Method          GET

*/

shapeAI.get("/c/:category",(req,res)=>{
    const getSpecificBook=database.books.filter(
        (book)=>book.category.includes(req.params.category)
    );

    if(getSpecificBook.length===0){
        return res.json({
            error:`No book found for the category of ${req.params.category}`,
        });
    }
    return res.json({book:getSpecificBook});

});
/*
Route           /author
description     get all authors
access          PUBLIC
Parameters      none
Method          GET

*/

shapeAI.get("/author",(req,res)=>{
    return res.json({authors:database.authors});

});
    /*
Route           /author
description     get a list of authors based on a books ISBN
access          PUBLIC
Parameters      ISBN
Method          GET

*/
shapeAI.get("/author/:isbn",(req,res)=>{
    const getSpecificAuthors=database.authors.filter((author)=>
    author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthors.length===0){
        return res.json({error:`no author found for the book ${req.params.isbn}`,

    });
    }
    return res.json({authors:getSpecificAuthors});
});
  /*
Route           /author
description     get a list of authors based on a books ISBN
access          PUBLIC
Parameters      ISBN
Method          GET

*/
shapeAI.get("publications",(req,res)=>{
 return res.json({publications:database.publications})
});
shapeAI.listen(3000,()=>console.log("hey!!! server is running"));