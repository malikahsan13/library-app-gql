import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { Get_Authors, Add_Book } from '../queries/queries';
import { useState } from 'react';

export default function AddBook() {
    const [addBook, { data, loading, error }] = useMutation(Add_Book);
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");

    function DisplayAuthors() {
        const { loading, error, data } = useQuery(Get_Authors);
        if (loading) return <option>Loading...</option>;
        if (error) return <option>Error : {error.message};</option>
        return data.authors.map(({ id, name, genre }) => (
          <option key={id} value={id}>{name}</option>
        ));  
      }
      function submitForm(e){
        e.preventDefault();
        if (loading) return 'Submitting...';
        if (error) return `Submission error! ${error.message}`;
        addBook({ variables: { name: name, genre: genre, authorId: authorId } });
        //setName=""; setGenre=""; setAuthorId="";
      }
  return (
    <div>
      <form id='add-book' onSubmit={submitForm}>
        <div className='field'>
            <label>Book Name</label>
            <input type="text" onChange={(e) => setName(e.target.value) } />
        </div>
        <div className='field'>
            <label>Genre</label>
            <input type="text" onChange={(e) => setGenre(e.target.value) } />
        </div>
        <div className='field'>
            <label>Author</label>
            <select onChange={(e) => setAuthorId(e.target.value)}>
                <option>Select Author</option>
                {DisplayAuthors()}
            </select>
        </div>
        <button>+</button>
      </form>
    </div>
  )
}
