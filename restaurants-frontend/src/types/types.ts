export interface ITickets {
    id: number,
    ticket_name: string,
    max_purchase_count: number,
    purchases: number,
    restaurant_id: number,
}

export interface IRestaurants {
    id: number,
    restaurant_name: string,
}

export interface IState {
    currentId: number,
    username: string,
    password: string,
    currentUser: number,
    currentRestaurant: number,
    restaurantName: string,
    ticket:ITickets,
    tickets: Array<ITickets>,
    restaurants: Array<IRestaurants>,
    getTicketData: Function,
    getRestaurantData: Function,
    deleteTicketData: Function,
    createRestaurant: Function,
    setRestaurantName: Function,
    setCurrentRestaurant: Function,
    setCurrentId: Function,
    updateTicket: Function,
    getTicketById: Function,
    setUserName: Function,
    setPassword: Function,
    signUp: Function,
    logIn: Function,
}

export interface IProps {
    appState: IState
}