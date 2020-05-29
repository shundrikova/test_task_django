import React, {useEffect, useMemo} from "react";
import {appState} from "../../mobx/state/AppState";
import RestaurantTickets from "../../mobx/components/RestaurantTickets/RestaurantTickets";
import {Redirect, useHistory} from "react-router-dom";
import "./style.css";



const TicketListPage = () => {
    const history = useHistory();

    useEffect(() => {
        appState.getRestaurantData(appState.currentUser).then(() => appState.getTicketData(appState.currentRestaurant));
    }, []);


    const redirectToCreateTicket = () => {
        history.push("/createTicket");
    };

    const redirectToCreateRestaurant = () => {
        history.push("/createRestaurant");
    };


    if (appState.currentUser === -1) {
        return <Redirect to="/login" />;
    }

    return( <div>
        <input type='button' value="create restaurant" onClick={redirectToCreateRestaurant}/>
        <input type='button' value="create ticket" onClick={redirectToCreateTicket}/>
        <RestaurantTickets appState={appState}/>
    </div>);
};

export default TicketListPage;