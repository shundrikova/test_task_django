import React from "react";
import { appState } from "../../mobx/state/AppState";
import { useHistory } from "react-router-dom";
import "./style.css";

interface IUpdateParams {
    match: any;
}

const UpdateTicket:React.FC<IUpdateParams> = ({match}) => {
    const history = useHistory();


    const currentTicketNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const getTextAreaValue: string = e.target.value;
        appState.setTicketName(getTextAreaValue);
    };

    const currentMaxPurchaseCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const getTextAreaValue: string = e.target.value;
        appState.setMaxPurchaseCount(parseInt(getTextAreaValue));
    };

    const updateTicket = async () => {
        await appState.updateTicket(match.params.id);
        history.push("/")
    };

    return(
        <div className="update-ticket-main">
        <label>Input ticket name</label>
        <input type='text' onChange={currentTicketNameChange}/>
        <label>Input ticket max purchase count</label>
        <input type='number' onChange={currentMaxPurchaseCountChange}/>
        <input className="update-ticket-main_create-button" type='button' value='create' onClick={updateTicket}/>
    </div>);
};

export default UpdateTicket;