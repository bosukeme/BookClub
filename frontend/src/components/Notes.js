import  {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Note from '../components/Note'
import api from "../api";
import '../styles/Notes.css'


function Notes() {

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const getNotes = async () => {
        const route = "/api/notes/"
        try {
            const res = await api.get(route)
            setNotes(res.data)
        }
        catch (error) {
            setNotes([])
        }
    }

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/note/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const updateNote = (id, updatedTitle, updatedContent) => {
        api
            .patch(`/api/notes/note/${id}/`, { title: updatedTitle, content: updatedContent})
            .then((res) => {
                if (res.status === 200) alert("Note Update!");
                else alert("Failed to update note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    alert("Note created!");
                    setTitle("");
                    setContent("");
                }
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        await createNote(e);
    } 


    useEffect(() => {
        getNotes();
    }, [])



    return (
        <div className='container'>
            <div className='notes-border'>
                <h2 className='notes-h2'>Create a Note</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group form-group-center'> 
                        <label htmlFor='title'><b>Title:</b></label>
                        <br />
                        <div >
                            <input
                                className='form-control'
                                type="text"
                                id="title"
                                name='titie'
                                required  
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />

                        </div>
                        
                        <br />

                        <label htmlFor='content'><b>Content:</b></label>
                        <div >
                            <textarea
                            className="form-control"
                                id="content"
                                name='content'
                                required  
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                rows="3"
                            />
                        </div>
                        
                        <br />
                        <br/>
                        <input type="submit" value="Submit" className="btn btn-primary mb-2 btn-center"></input>
                    </div>
                </form>
            </div>
                        
            <br />
            <hr />
            <br/>

            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} onUpdate={updateNote} key={note.id} />
                ))}
            </div>

        </div>
    )
}

export default Notes;