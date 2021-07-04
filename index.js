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

//EstablishDatabase connection

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
 /*
Route           /book/new
description     addnew books
access          PUBLIC
Parameters      NONE
Method          POST

*/
shapeAI.post("/book/new",(req,res)=>{
    //body
    const {newBook} =req.body;
    database.books.push(newBook);
    return res.json({books:database.books,message:"books were added"});
});
/*
Route           /book/new
description     addnew author
access          PUBLIC
Parameters      NONE
Method          POST

*/

shapeAI.post("/author/new",(req,res)=>{
    const {newAuthor} =req.body;
    database.books.push(newBook);
    return res.json({authors:database.authors,message:"author  was added"});
});
 /*
Route           /book/update
description     update title of a book
access          PUBLIC
Parameters      ISBN
Method          PUT

*/
shapeAI.put("/book/update/:isbn",(req,res)=>{
   //map or foreach ->
   database.books.forEach((book)=>{
 if(book.ISBN===req.params.isbn){
     book.title=req.body.bookTitle;
     return;
 } 
   });
   return res.json({books:database.books});
});
/*
Route           /book/author/update/:isbn
description     update/add
access          PUBLIC
Parameters      ISBN
Method          PUT

*/
shapeAI.put("/book/author/update/:isbn",(req,res)=>{

    database.book.forEach((book)=>{
   if(book.ISBN===req.params.isbn) return book.authors.push(req.body.newAuthor);
    });
    database.authors.forEach((author)=>{
        if(author.id===req.body.newAuthor)
        return author.books.push(req.params.isbn);
    });
    return res.json({books:database.books,authors:database.authors,message:"New author was added",
    });
});

/*
Route           /publication/update/book
description     update/add new book to a publication
access          PUBLIC
Parameters      NONE
Method          PUT

*/
shapeAI.put("publication/update/book/:isbn",(req,res)=>{
//update the publication database
database.publications.forEach((publication)=>{
    if(publication.id===req.body.pubid){
        return publication.books.push(req.params.isbn);
    }
});
database.books.forEach((book)=>{
   if(book.ISBN===req.params.isbn){
       book.publication=req.body.pubid;
       return;
   }
});
return res.json({books:database.books,publications:database.publications,message:"successfully updatedpublication",
})
});
/*
Route           /book/delete
description     delete a book
access          PUBLIC
Parameters      isbn
Method          DELETE

*/
shapeAI.delete("/book/delete:isbn",(req,res)=>{
   
    const updatedBookDatabase = database.books.filter((book)=>
        book.ISBN!==req.params.isbn);
    database.books=updatedBookDatabase;
    return res.json({books:database.books});1
});
/*
Route           /book/delete/author
description     delete a author from a book
access          PUBLIC
Parameters      isbn,author id 
Method          DELETE

*/
shapeAI.delete("/book/delete/author/:isbn/:author id",(req,res)=>{
    //for each and filter
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            const newAuthorList =book.authors.filter((author)=>author!==parseint(req.params.authorid)
            );
            book.authors = newAuthorList;
            return;
        }
    });
    //update author database
    database.authors.forEach((author)=>{
        if(author.id=== parseInt(req.params.authorId))  {
            const newAuthorList =authors.books.filter((book)=>book !== req.params.isbn
            );
            author.books = newAuthorList;
            return;
        }
    });
    return res.json({book:database.books,author:database.authors,message:"author was deleted!!!",});
});

/*
Route           publication/delete/book
description     delete a book from publication
access          PUBLIC
Parameters      isbn,publication id 
Method          DELETE

*/
shapeAI.delete("/publication/delete/book/:isbn/:pubId",(req,res)=>{
    //update publication database
    database.publications.forEach((publication)=>{
 if(publication.id===parseint(req.params.pubId)){
     const newBooksList =publication.books.filter((book)=>book!==req.params.isbn
     );
     publication.books=newBooksList;
     return;

 }
    });
    //update book database
    database.books.forEach((book) => {
        if(book.ISBN===req.params.isbn){
            book.publication=0; //mo publication available
            return;
        }
    });
    return res.json({books:database.books,publications:database.publication,
    });
});


shapeAI.listen(3000,()=>console.log("hey!!! server is running"));