import React, {useEffect, useState} from 'react';
import LoginForm from '../loginForm/LoginForm';
import {makeRequest} from '../../services/apiService';

function App() {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        makeRequest.get('users')
            .then((response) => {
                console.log(response?.data?.value);
                setUsersList(response?.data?.value);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div>
            {usersList?.length ? <LoginForm usersList={usersList}/> : null}
        </div>
    );
}

export default App;
