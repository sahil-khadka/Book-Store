const FeaturedBook = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: "$12.99",
    image: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
    description:
      "A classic novel set in the Roaring Twenties, exploring themes of wealth, love, and the American Dream.",
  },
  {
    id: "2",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: "$10.99",
    image:
      "data:image/jpeg;base64,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",
    description:
      "A powerful story about racial injustice and childhood innocence in the Deep South.",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    price: "$14.99",
    image: "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg",
    description:
      "A dystopian novel about totalitarianism, surveillance, and the dangers of a controlled society.",
  },
  {
    id: "4",
    title: "Harry Potter and the Half-Blood Prince",
    author: "J.K. Rowling",
    price: "$14.99",
    image:
      "https://media.harrypotterfanzone.com/half-blood-prince-us-childrens-edition-2013.jpg",
    description:
      "A thrilling continuation of Harry Potter's journey, filled with magic, mystery, and adventure.",
  },
];

export default FeaturedBook;
