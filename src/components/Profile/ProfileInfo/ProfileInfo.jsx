import React from 'react';
import './profileInfo.scss';

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src='https://i.pinimg.com/736x/d6/80/11/d68011c2cf11925d254f06c07f317ac1.jpg'/>
            </div>

            <div className='description-block'>
                ava + description
                {/*<img src='https://media.wired.com/photos/5cd5e14a0077b40fa23edb69/master/pass/Culture_GOTdragons_dragonmath.jpg'/>*/}
            </div>
        </div>
    )
}

export default ProfileInfo;