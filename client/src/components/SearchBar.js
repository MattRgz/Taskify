import React from 'react';

const submitHandler = (e) =>{
    e.preventDefault()
}

const SearchBar = () => {
    return (
        <div>
            <form  onSubmit={submitHandler} className='derecha'>
                <input className='letraSecundaria searchInput' type="text" placeholder='Buscar...'/>
                <input className='letraSecundaria searchButton' type="submit" value={'Buscar'}/>
            </form>
        </div>
    );
}

export default SearchBar;
