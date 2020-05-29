import { ApiRequest } from "../../Api/ApiRequests"
import {runInAction, observable, action} from "mobx";
import {ITickets} from "../../types/types";


export const appState = observable ({
    tickets: [],
    ticket: {
        id: -1,
        ticket_name: '',
        max_purchase_count: 0,
        purchases: 0,
        restaurant_id: -1,
    },
    currentUser: -1,
    currentId: -1,
    restaurants: [],
    restaurantName: '',
    ticketName: '',
    maxPurchaseCount: -1,
    currentRestaurant: -1,
    username: '',
    password: '',

    setCurrentId: action('Set current ticket id',(currentId: number) =>{
        appState.currentId = currentId;
    }),
    setUserName : action('Set username',(username: string) =>{
        appState.username = username;
    }),
    setPassword : action('Set username',(password: string) =>{
        appState.password = password;
    }),
    setCurrentRestaurant: action('Set new restaurant name',(currentRestaurant: number) =>{
        appState.currentRestaurant = currentRestaurant;
    }),
    setRestaurantName : action('Set new restaurant name',(restaurantName: string) =>{
        appState.restaurantName = restaurantName;
    }),
    setTicketName : action('Set new ticket name',(ticketName: string) =>{
        appState.ticketName = ticketName;
    }),
    setMaxPurchaseCount : action('Set max purchase count',(maxPurchaseCount: number) =>{
        appState.maxPurchaseCount = maxPurchaseCount;
    }),
    getRestaurantData: action('Get restaurant data', async (user_id: number) => {
        const responseData = await ApiRequest.getDataRequest('restaurants', user_id);
        runInAction(() => {
            if(responseData.length > 0)
            appState.currentRestaurant = responseData[0].id;
            appState.restaurants = responseData;
        })
    }),
    getTicketData: action('Get ticket data', async (ticket_id: number) => {
        const responseData = await ApiRequest.getDataRequest('tickets',ticket_id);
        runInAction(() => {
            appState.tickets = responseData;
        })
    }),

    getTicketById: action('Get ticket data', async (ticket_id: number) => {
        const responseData = await ApiRequest.getDataRequest('ticket',ticket_id);
        runInAction(() => {
            appState.ticket.id = responseData.id;
            appState.ticket.ticket_name = responseData.ticket_name;
            appState.ticket.max_purchase_count = responseData.max_purchase_count;
            appState.ticket.purchases = responseData.purchases;
            appState.ticket.restaurant_id = responseData.restaurant_id;
        })
    }),

    createRestaurant: action('Create restaurant data', async () => {
        const responseData = await ApiRequest.addRestaurantDataRequest(appState.restaurantName, appState.currentUser);
        runInAction(() => {
            appState.restaurantName = '';
        })
    }),

    createTicket: action('Create new ticket', async () => {
        const responseData = await ApiRequest.addTicketDataRequest();
        runInAction(() => {
            appState.ticketName = '';
            appState.maxPurchaseCount = 0;
        })
    }),

    updateTicket: action('Update ticket', async (id: number) => {
        const responseData = await ApiRequest.updateDataRequest(id);
        runInAction(() => {
            appState.ticketName = '';
            appState.maxPurchaseCount = 0;
            appState.currentId = -1;
        })
    }),

    purchaseTicket: action('Purchase ticket', async (id: number) => {
        const responseData = await ApiRequest.purchaseTicketRequest(id);
        runInAction(() => {
            if(!responseData) {
                alert('All tickets already sold')
            }
        })
    }),

    signUp: action('Create create new user', async () => {
        const responseData = await ApiRequest.signUpRequest();
        runInAction(() => {
            appState.username = '';
            appState.password = '';
        })
    }),

    logIn: action('User log In', async () => {
        const responseData = await ApiRequest.logInRequest();
        runInAction(() => {
            appState.currentUser = responseData.id;
            appState.username = '';
            appState.password = '';
        })
    }),

    deleteTicketData: action('Delete restaurant data', async (ticket_id: number) => {
        const responseData = await ApiRequest.deleteDataRequest(ticket_id);
        if (responseData) {
            runInAction(() => {
                const newTasksArray= appState.tickets.filter((ticket: ITickets) => ticket.id !== ticket_id);
                appState.tickets = newTasksArray;
            })
        }
    }),
});