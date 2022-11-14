import React from 'react';


const HomeCardRight = ({imgSrc,text}) => {
    return (
        <div  className='homeCard'>
            <div className='CardImg'>
                {imgSrc}
            </div>
            <p>
                {text}
            </p>
        </div>
    );
}

export default HomeCardRight;
