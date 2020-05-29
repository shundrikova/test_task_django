import React from "react";
import "./style.css";
import {appState} from "../../mobx/state/AppState";
import { useHistory } from "react-router-dom";



const LogIn = () => {
    const history = useHistory();

    const currentUserNameTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const getTextAreaValue: string = e.target.value;
        appState.setUserName(getTextAreaValue);
    };

    const currentUserPasswordTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const getTextAreaValue: string = e.target.value;
        appState.setPassword(getTextAreaValue);
    };

    const userlogIn = async () => {
        await appState.logIn();
        history.push("/")
    };

    return( <div className="user-login-main">
        <label>Input user name</label>
        <input type='text' onChange={currentUserNameTextChange}/>
        <label>Input user password</label>
        <input type='password' onChange={currentUserPasswordTextChange}/>
        <input className="user-login-main_create-button" type='button' value="LogIn" onClick={userlogIn}/>
        <a href="/signup">SignUp</a>
    </div>);
};

export default LogIn;