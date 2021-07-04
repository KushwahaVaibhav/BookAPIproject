const books=[{

    ISBN:"1234ONE",
    title: "getting started with MERN",
    authors:[1,2],
    language:"en",
    pubDate:"2021-07-07",
    numOfPages:225,
    category:["fiction","programming","development","tech"],
    publications:1,
},
{   ISBN:"1234TWO",
    title: "getting started with python",
    authors:[1,2],
    language:"en",
    pubDate:"2021-07-07",
    numOfPages:225,
    category:["fiction","development","tech"],
    publications:1,
},];
const authors = [
    {
      id: 1,
      name: "pavan",
      books: ["1234ONE"],
    },
    {
      id: 2,
      name: "Deepak",
      books: ["1234ONE"],
    },
  ];
  
  const publications = [
    {
      id: 1,
      name: "Chakra",
      books: ["1234ONE"],
    },
    {
      id: 2,
      name: "Johny publication",
      books: [],
    },
  ];
  
  module.exports = { books, authors, publications };
  