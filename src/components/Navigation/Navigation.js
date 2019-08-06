import React from 'react';

const Navigation = ({ onRouteChange, routeState }) => {
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            {routeState === 'signin' || routeState === 'register' ?
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f4 link dim black underline pa3 pointer'>SignIn</p>
                <p onClick={() => onRouteChange('register')}className='f4 link dim black underline pa3 pointer'>Register</p>
            </div>    
            :
            <p onClick={()=>onRouteChange('signin')} className='f4 link dim black underline pa3 pointer'>Sign Out</p>}
        </nav>
    );
}

export default Navigation;