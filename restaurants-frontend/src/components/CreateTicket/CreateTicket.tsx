import React from "react";
import "./style.css";
import {appState} from "../../mobx/state/AppState";
import { useHistory } from "react-router-dom";



const CreateTicket = () => {
    const history = useHistory();

    const currentTicketNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const getTextAreaValue: string = e.target.value;
        appState.setTicketName(getTextAreaValue);
    };

    const currentMaxPurchaseCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const getTextAreaValue: string = e.target.value;
        appState.setMaxPurchaseCount(parseInt(getTextAreaValue));
    };

    const createTicket = async () => {
        await appState.createTicket();
        history.push("/")
    };

    return( <div className="create-ticket-main">
        <label>Input ticket name</label>
        <input type='text' onChange={currentTicketNameChange}/>
        <label>Input ticket max purchase count</label>
        <input type='number' onChange={currentMaxPurchaseCountChange}/>
        <input className="create-ticket-main_create-button" type='button' value='create' onClick={createTicket}/>
    </div>);
};

export default CreateTicket;