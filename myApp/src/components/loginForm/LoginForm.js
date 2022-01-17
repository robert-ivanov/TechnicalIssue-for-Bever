import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../constants/routes';
import {LOCAL_STORAGE_KEYS} from '../../constants/common';
import {localStorageSet} from '../../helpers/helperFunctions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginForm({usersList}) {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Handles username change
     *
     * @param {array} event
     */
    const handleUsernameChange = (event) => {
        const {target: {value}} = event;
        setUsername(value);
    };

    /**
     * Handles password change
     *
     * @param {array} event
     */
    const handlePasswordChange = (event) => {
        const {target: {value}} = event;
        setPassword(value);
    };

    /**
     * Handles login functionality
     *
     */
    const handleSubmit = () => {
        const successLogin = usersList.find(({Name, Password}) => Password === password && Name === username);
        if (!!successLogin) {
            navigate(ROUTES.INVOICES);
            localStorageSet(LOCAL_STORAGE_KEYS.USER_INFO, successLogin);
        }
    }

    return (
        <Box component="form" sx={{display: 'flex', flexDirection: 'column'}}>
            <TextField label="Username" variant="standard" onChange={handleUsernameChange}/>
            <TextField type="password" label="Password" variant="standard" onChange={handlePasswordChange}/>
            <Button variant="contained" onClick={handleSubmit}>Login</Button>
        </Box>
    )
}

LoginForm.propTypes = {
    usersList: PropTypes.array.isRequired
};

export default LoginForm;