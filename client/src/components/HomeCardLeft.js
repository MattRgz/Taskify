import React from 'react';


const HomeCardLeft = ({imgSrc,text}) => {
    return (
        <div  className='homeCardReversed'>
            <div>
                <p>
                    {text}
                </p>
            </div>
            <div className='CardImg'>
                {imgSrc}
            </div>
        </div>
    );
}

export default HomeCardLeft;
