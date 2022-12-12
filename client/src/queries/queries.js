import {gql, useMutation  } from '@apollo/client';

const Get_Books = gql`
  query GetBooks {  
    books {
      id
      name
      genre
    }
  }
`;

const Get_Authors = gql`
  query GetAuthors {  
    authors {
      id
      name
    }
  }
`;

const Add_Book = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      authorId
    }
  }
`;

export {Get_Books, Get_Authors, Add_Book};