import {gql } from '@apollo/client';

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

export {Get_Books, Get_Authors};