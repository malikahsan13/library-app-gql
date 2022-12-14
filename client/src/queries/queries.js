import {gql} from '@apollo/client';

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
  mutation AddBook($name: String!, $genre: String!, $authorId: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;

const Get_Book_Detail = gql`
  query book($id: ID){
    book(id: $id){
        name
        genre
        author{
            name
            age
            books{
                name
                genre
            }
        }
    }
  }
`;

export {Get_Books, Get_Authors, Add_Book, Get_Book_Detail};