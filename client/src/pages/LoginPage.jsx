import React from 'react';

const LoginPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <img
                src={require('./u8logo.png')}
                alt="untitled8 logo"
                style={{ width: '400px', height: '400px' }}
                />
            <button>Sign in with Google</button>
        </div>
    );
};

export default LoginPage;
