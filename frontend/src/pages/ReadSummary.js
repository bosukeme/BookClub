import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Notes from '../components/Notes';
import api from "../api";
import "../styles/Home.css"

function ReadSummary() {
    
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const getBook = async (bookId) => {
        const route = `/api/books/book/${bookId}/`

        try {
            const res = await api.get(route)
            setBook(res.data)
            setLoading(false)
        }
        catch (error) {
            setError(error)
            setLoading(false)
            
        }
    }


    useEffect(() => {
        if (id) {
            getBook(id);
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading book: {error.message}</div>;
    }

    if (!book || !book) {
        return <div>No book found</div>;
    }


    return (
        <div className='container'>
            <h1 className='summary-title'>{book.title} - {book.year_published}</h1>
            <p className='summary-title'>{book.author}</p>

            <div className='summary-div'> 
                <img src={book.image_url} alt="Book Cover" />    
            </div>
            <p className='summary-title'> <i>Genre: {book.genre} </i></p>
            <br/>
            <p> {book.summary} 
                <a href={book.link} target='_blank' rel="noopener noreferrer"> continue reading here</a>
            </p>

            <hr />

            <Notes />        
        
        </div>
    )
}

export default ReadSummary;