import React, {useEffect, useMemo} from "react";
import {appState} from "../../mobx/state/AppState";
import {useHistory} from "react-router-dom";
import Ticket from "../../mobx/components/Tickets/Ticket";

interface IDetailParams {
    match: any;
}


const TicketDetail:React.FC<IDetailParams> = ({match}) => {
    const history = useHistory();


    useEffect(() => {
        appState.getTicketById(match.params.id)
    }, []);


    const redirectBuyTicketPage = () => {
        history.push('/' + match.params.restaurantId + '/purchase/' + match.params.id);
    };


    return( <div>
        <Ticket ticket={appState.ticket}/>
        <input type='button' value='Purchase Ticket' onClick={redirectBuyTicketPage}/>
    </div>);
};

export default TicketDetail;