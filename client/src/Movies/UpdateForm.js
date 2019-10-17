import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
    title: '', 
    director: '',
    metascore: null,
    stars: []
}

const UpdateForm = props => {
    const[movie, setMovie] = useState(initialState);

    const handleChange = e => {
        e.persist();
        let value = e.target.value;

        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.updateMovies(res.data);
                props.history.push('/movies');
            })
            .catch(err => console.log(err.response));
    };

    return (
        <div className='update-form'>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    name='title' 
                    onChange={handleChange}
                    placeholder='Title'
                    value={movie.title}
                />
                <input 
                    type='text' 
                    name='director' 
                    onChange={handleChange}
                    placeholder='Director'
                    value={movie.director}
                />
                <button>Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;