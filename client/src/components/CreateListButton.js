import React from 'react';
import { Link } from 'react-router-dom';

const CreateListButton = () => {
    return (
        <Link style={{marginTop:'2%',width:'70%'}} to={'/new-list'}>
            <button style={{width:'100%'}} className='letraSecundaria newListButton'>Crear Lista</button>
        </Link>
    );
}

export default CreateListButton;
