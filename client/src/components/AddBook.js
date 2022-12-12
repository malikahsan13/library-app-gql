import React from 'react'
import { useQuery } from '@apollo/client';
import { Get_Authors } from '../queries/queries';


export default function AddBook() {
    function DisplayAuthors() {
        const { loading, error, data } = useQuery(Get_Authors);
        if (loading) return <option>Loading...</option>;
        if (error) return <option>Error : {error.message};</option>
        return data.authors.map(({ id, name, genre }) => (
          <option key={id} value={id}>{name}</option>
        ));  
      }
  return (
    <div>
      <form id='add-book'>
        <div className='field'>
            <label>Book Name</label>
            <input type="text" />
        </div>
        <div className='field'>
            <label>Genre</label>
            <input type="text" />
        </div>
        <div className='field'>
            <label>Author</label>
            <select>
                <option>Select Author</option>
                {DisplayAuthors()}
            </select>
        </div>
        <button>+</button>
      </form>
    </div>
  )
}
