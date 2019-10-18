import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
    title: '', 
    director: '',
    metascore: null,
    stars: []
}

const UpdateForm = (props) => {
    const [movie, setMovie] = useState(initialState);

    const handleChange = e => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const editMovie = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                setMovie(res.data);
                props.history.push(`/`);
            })
            .catch(err => console.log(err.res));
    };

    //const movieToEdit = movies.find(movie => `${movie.id}` === props.match.params.id);
    useEffect(() => {
       axios
        .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => setMovie(res.data))
        .catch(err => console.log(err.res))
    }, [props.match.params.id])
   

    return (
        <div className='update-form'>
            <form onSubmit={editMovie}>
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

                {movie.stars.map(star => 
                    <input 
                    type='text' 
                    name='stars' 
                    onChange={handleChange}
                    placeholder='Stars'
                    value={star}
                    />
                )}  
                <button>Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;