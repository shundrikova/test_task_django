import React from "react";
import {IProps, IRestaurants, ITickets} from "../../../types/types";
import {observer} from "mobx-react";
import {appState} from "../../state/AppState";
import { useHistory } from "react-router-dom";

interface ITicket {
    ticket: ITickets
}

const Ticket: React.FC<ITicket> = observer (props =>  (

    <div key={'ticket'} className={'ticket'}>
        <label className={'ticketElement'}>Ticket Name:</label>
        <div className={'ticketElement'}>{props.ticket.ticket_name}</div>
        <label className={'ticketElement'}>Max purchase count: </label>
        <div className={'ticketElement'}>{props.ticket.max_purchase_count}</div>
        <div className={'ticketElement'}>Purchases: </div>
        <div className={'ticketElement'}>{props.ticket.purchases} </div>
    </div>

));

export default Ticket;