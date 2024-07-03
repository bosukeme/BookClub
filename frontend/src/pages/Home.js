import { useState, useEffect, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../api";
import "../styles/Home.css"

import BookLoadingComponent from "../components/LoadingBooks";
import Books from "../components/Books";

function Home() {

    const BookLoading = BookLoadingComponent(Books);
    const [appState, setAppState] = useState({
		loading: true,
		books: [],
	});
    const [searchTerm, setSearchTerm] = useState('');

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getBooks = useCallback( async () => {
        const route = "/api/books/book/"
        try {
            const res = await api.get(route)
            const shuffledBooks = shuffleArray(res.data);
            setAppState({ loading: false, books: shuffledBooks})
        }
        catch (error) {
            setAppState({ loading: true, books: []})
        }
    }, [])


    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredBooks = appState.books?.filter((bk) =>
        bk.title.toLowerCase().includes(searchTerm) ||
        bk.author.toLowerCase().includes(searchTerm) ||
        bk.genre.toLowerCase().includes(searchTerm)
    );

    useEffect(() => {
        getBooks();
    }, [getBooks])
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
            
            <BookLoading isLoading={appState.loading} books={filteredBooks} />
            
        </div>
        </div>
        
    );
}

export default Home;
