import React from "react";
import { useQuery } from "@apollo/client";
import { Get_Book_Detail } from "../queries/queries";

const BookDetail = ({ bookId }) => {
  function ShowDetails() {
    const { loading, error, data } = useQuery(Get_Book_Detail, {
        variables: { id: bookId },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{//Error : {//error.message}
    }</p>;
    const { book } = data;
    if(book){
        return(
            <div>
            <h2>Book Name: {book.name}</h2>
            <p>Book Genre: {book.genre}</p>
            {/* <p>{book.author.name}</p>
            <p>All Books by This Author</p>
            <ul>
            {
            book.author.books.map((item) => {
                return <li key={item.id}>{item.name}</li>;
            })}
            </ul> */}
        </div>
        )
    }else{
        return ( <div>No Book Selected ...</div> )
    }
  }
  return (
    <div>
      <p>Click on Book Name to Get Details of Book</p>
        {ShowDetails()}
    </div>  
        
  );
};

export default BookDetail;
