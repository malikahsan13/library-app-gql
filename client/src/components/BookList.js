import React, {useState} from 'react'
import { useQuery } from '@apollo/client';
import { Get_Books } from '../queries/queries';
import BookDetail from "./BookDetail";

export default function BookList() {
    const [bookId,selectBookId] = useState("");
    function DisplayBooksList() {
        const { loading, error, data } = useQuery(Get_Books);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error : {error.message}</p>;
        return data.books.map(({ id, name, genre }) => (
          <li onClick={(e)=>{selectBookId(id)}} style={{ cursor:"pointer" }} key={id}>{name}</li>
        ));  
      }
      
  return (
    <div>
        <ul id='book-list'>
            {DisplayBooksList()}
        </ul>
        <BookDetail bookId={bookId} />
    </div>
  )
}
