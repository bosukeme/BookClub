import { useState, useEffect, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import api from "../api";
import "../styles/Home.css"



function Home() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getBooks = useCallback( async () => {
        const route = "/books/book/"
        try {
            const res = await api.get(route)
            const shuffledBooks = shuffleArray(res.data.data);
            setBooks(shuffledBooks)
        }
        catch (error) {
            setBooks([])
        }
    }, [])



    useEffect(() => {
        getBooks();
    }, [getBooks])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredBooks = books.filter((bk) =>
        bk.attributes.title.toLowerCase().includes(searchTerm) ||
        bk.attributes.author.toLowerCase().includes(searchTerm) ||
        bk.attributes.genre.toLowerCase().includes(searchTerm)
    );
    
    return (
        <div className="container"> 
            <div className="home-container">
            <h1> Books </h1>
            <hr />

            <input
                type="text"
                id="search-input"
                placeholder="Search books..."
                onChange={handleSearch}
                className="form-control mb-4"
            />
            <br />
            
            <div className="row">
                {filteredBooks.map((bk, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100">
                            <div>
                                <img src={bk.attributes.image_url} alt="Book Cover" className="card-img-top home-image"  />
                                <span className="home-genre"> {bk.attributes.genre}</span>
                            </div>
                            
                            <div className="home-text">

                                    <div className="card-body">
                                        <h5 className="card-title">{bk.attributes.title} ({bk.attributes.year_published})</h5>
                                        <p className="card-text">Author: {bk.attributes.author}</p>
                                        
                                        <Link
                                            to={`/books/book/${bk.id}`}
                                            state={bk.attributes}
                                            className="btn btn-primary push-to-end">
                                            Read Summary                                
                                        </Link>
                                    </div>
                                        
                            </div>
                            
                        </div>
                    </div>

                ))}     
            
            </div>
        </div>
        </div>
        
    );
}

export default Home;
