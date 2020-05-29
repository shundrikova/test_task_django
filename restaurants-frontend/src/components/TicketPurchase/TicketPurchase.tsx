import React, {useEffect, useMemo} from "react";
import {appState} from "../../mobx/state/AppState";
import {useHistory} from "react-router-dom";
import Ticket from "../../mobx/components/Tickets/Ticket";

interface IDetailParams {
    match: any;
}


const TicketPurchase:React.FC<IDetailParams> = ({match}) => {
    const history = useHistory();


    useEffect(() => {
        appState.getTicketById(match.params.id)
    }, []);


    const BuyTicket = () => {
        appState.purchaseTicket(match.params.id);
        history.push("/");
    };


    return( <div>
        <Ticket ticket={appState.ticket}/>
        <label>Do you want to buy this ticket?</label>
        <br />
        <input type='button' value='Buy' onClick={BuyTicket}/>
    </div>);
};

export default TicketPurchase;