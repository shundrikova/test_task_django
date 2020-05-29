import React from "react";
import "./style.css";
import {appState} from "../../mobx/state/AppState";
import { useHistory } from "react-router-dom";



const Signup = () => {
    const history = useHistory();

    const currentUserNameTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const getTextAreaValue: string = e.target.value;
        appState.setUserName(getTextAreaValue);
    };

    const currentUserPasswordTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const getTextAreaValue: string = e.target.value;
        appState.setPassword(getTextAreaValue);
    };

    const createNewUser = async () => {
        await appState.signUp();
        history.push("/login")
    };

    return( <div className="create-user-main">
        <label>Input user name</label>
        <input type='text' onChange={currentUserNameTextChange}/>
        <label>Input user password</label>
        <input type='password' onChange={currentUserPasswordTextChange}/>
        <input className="create-user-main_create-button" type='button' value='create' onClick={createNewUser}/>
    </div>);
};

export default Signup;