import React from 'react';
import './App.css';
import TicketListPage from "./components/TicketsListPage/TicketsListPage";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CreateRestaurant from "./components/CreateRestaurant/CreateRestaurant";
import CreateTicket from "./components/CreateTicket/CreateTicket";
import UpdateTicket from "./components/UpdateTicket/UpdateTicket";
import TicketDetail from "./components/Detail/TicketDetail";
import TicketPurchase from "./components/TicketPurchase/TicketPurchase";
import TicketsListNotAuthorized from "./components/TicketsListNotAutorized/TicketsListNotAuthorized";
import Signup from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";

function App() {
  return (
      <BrowserRouter >
        <Switch>
          <Route exact path="/registration" component={TicketListPage}/>
          <Route exact path="/" component={TicketListPage}/>
          <Route exact path="/createRestaurant" component={CreateRestaurant}/>
          <Route exact path="/createTicket" component={CreateTicket}/>
          <Route exact path="/updateTicket/:id" component={UpdateTicket}/>
          <Route exact path="/:restaurantId/tickets/:id" component={TicketDetail}/>
          <Route exact path="/:restaurantId/purchase/:id" component={TicketPurchase}/>
          <Route exact path="/:restaurantId/tickets" component={TicketsListNotAuthorized}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={LogIn}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
