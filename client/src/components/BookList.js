import React from 'react'
import {gql, useQuery } from '@apollo/client';

const Get_Books = gql`
  query GetBooks {  
    books {
      id
      name
      genre
    }
  }
`;
export default function BookList() {
    function DisplayBooksList() {
        const { loading, error, data } = useQuery(Get_Books);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error : {error.message}</p>;
        return data.books.map(({ id, name, genre }) => (
          <li key={id}>{name}</li>
        ));  
      }
      
  return (
    <div>
        <ul id='book-list'>
            {DisplayBooksList()}
        </ul>
    </div>
  )
}
