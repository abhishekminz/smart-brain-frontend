import React from 'react';

const Rank = ({userInfo}) => {
    return(
        <div>
            <div style={{color: 'white'}} className='f2'>
                {`${userInfo.name} your entry is..`}
            </div>
            <div style={{color: 'white'}} className='f1'>
                {`${userInfo.entries}`}
            </div>
        </div>
    );
}

export default Rank;