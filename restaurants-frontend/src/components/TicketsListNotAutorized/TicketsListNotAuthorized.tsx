import React, {useEffect, useMemo} from "react";
import {appState} from "../../mobx/state/AppState";
import {useHistory} from "react-router-dom";
import Ticket from "../../mobx/components/Tickets/Ticket";
import {IProps, IRestaurants, ITickets} from "../../types/types";
import {observer} from "mobx-react";
import TicketControllers from "../../mobx/components/TicketControllers/TicketControllers";

interface IDetailParams {
    match: any;
}


const TicketsListNotAuthorized:React.FC<IDetailParams> = ({match}) => {
    const history = useHistory();


    useEffect(() => {
        appState.getTicketData(match.params.restaurantId)
    }, []);



    const Tickets: React.FC<IProps> = observer (props =>  (<section>
        <div>
            <div>
                {props.appState.tickets.map((ticket:ITickets, index) => {return <div> <Ticket ticket={ticket}/> <a className={'ticketElement'} href={'/' + appState.currentRestaurant + '/tickets/' + ticket.id}>Detail</a> <hr /> </div>})}
            </div>
        </div>

    </section>));


    return( <div>
        <Tickets appState={appState}/>
    </div>);
};

export default TicketsListNotAuthorized;