import React from "react";
import {IProps, IRestaurants, ITickets} from "../../../types/types";
import {observer} from "mobx-react";
import {appState} from "../../state/AppState";
import { useHistory } from "react-router-dom";

interface ITicket {
    ticket: ITickets
}

const TicketControllers: React.FC<ITicket> = observer (props =>  (

    <div key={'ticketControllers'} className={'ticket'}>
        <a className={'ticketElement'} href={`/updateTicket/` + props.ticket.id}>Edit</a>
        <a className={'ticketElement'} href={'/' + appState.currentRestaurant + '/tickets/' + props.ticket.id}>Detail</a>
        <input className={'ticketElement'} type="button" value="delete" onClick={() => appState.deleteTicketData(props.ticket.id)}/>
    </div>

));
export default TicketControllers;