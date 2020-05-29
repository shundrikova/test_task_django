import React from "react";
import {IProps, IRestaurants, ITickets} from "../../../types/types";
import {observer} from "mobx-react";
import {appState} from "../../state/AppState";
import Ticket from "../Tickets/Ticket";
import TicketControllers from "../TicketControllers/TicketControllers";

async function handleChange(e: any) {
    let {name, value} = e.target;
    appState.setCurrentRestaurant(value);
    await appState.getTicketData(value)
}


const RestaurantTickets: React.FC<IProps> = observer (props =>  (<section>
    <select id="restaurants_list" onChange={handleChange}>
        {props.appState.restaurants.map((restaurant:IRestaurants, index) => {return <option key={'restaurant' + index} value={restaurant.id}>{restaurant.restaurant_name}</option>})}
    </select>

    <div>
        <div>
            {props.appState.tickets.map((ticket:ITickets, index) => {return <div> <Ticket ticket={ticket}/> <TicketControllers ticket={ticket}/> <hr /> </div>})}
        </div>
    </div>

</section>));

export default RestaurantTickets;