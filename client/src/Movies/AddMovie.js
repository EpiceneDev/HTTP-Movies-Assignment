import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './MovieList';

const initialState = {
    title: '', 
    director: '',
    metascore: null,
    stars: []
}

const AddMovie = (props) => {
    const [movie, setMovie] = useState(initialState);

    const handleChange = e => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        axios   
            .post(`http://localhost:5000/api/movies`, movie)
            .then(res => console.log('POST', res))
            .catch(err => console.log(err.res))
    }

    const addStar = (e) => {
        e.persist();
        let newStar = e.target.value
        setMovie({
            ...movie,
            stars: [...movie.stars, newStar]
        })
    }

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
                 <input 
                    type='text' 
                    name='metascore' 
                    onChange={handleChange}
                    placeholder='Metascore'
                    value={movie.metascore}
                />

                <input 
                    type='text' 
                    name='stars' 
                    onChange={addStar}
                    placeholder='Stars'
                    value={movie.star}
                />
                
                <button>Update</button>
            </form>
        </div>
    );
};

export default AddMovie;