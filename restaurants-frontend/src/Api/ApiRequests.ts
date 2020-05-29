import {appState} from "../mobx/state/AppState";

const serverApi = "http://localhost:8000/api";


const getDataRequest = async (dataType: string, id: number) => {
    const response = await fetch(serverApi + `/${dataType}/${id}/`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (response.status === 200) {
        return data;
    }
};


async function addTicketDataRequest() {
    const data = {
        ticket_name: appState.ticketName,
        max_purchase_count: appState.maxPurchaseCount,
        purchases: 0,
        restaurant_id: appState.currentRestaurant
    };
    console.log(data);
    const response = await fetch(serverApi + `/ticket/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const receiveData = await response.json();
    if (response.status === 201) {
        return receiveData;
    }
}


async function signUpRequest() {
    const data = {
        user_name: appState.username,
        user_password: appState.password,
    };
    const response = await fetch(serverApi + `/signup/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const receiveData = await response.json();
    if (response.status === 201) {
        return receiveData;
    }
}


async function logInRequest() {
    const data = {
        user_name: appState.username,
        user_password: appState.password,
    };
    const response = await fetch(serverApi + `/login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const receiveData = await response.json();
    if (response.status === 200) {
        return receiveData;
    }
}

async function updateDataRequest(id: number) {
    const data = {
        ticket_name: appState.ticketName,
        max_purchase_count: appState.maxPurchaseCount
    };
    const response = await fetch(serverApi + `/ticket/${id}/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.status === 200;
}

async function purchaseTicketRequest(id: number) {
    const response = await fetch(serverApi + `/ticket/purchase/${id}/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    return response.status === 200;
}

async function addRestaurantDataRequest(restaurantName: string, currentUser: number) {
    const data = {
        restaurant_name: restaurantName,
        user_id: currentUser,
    };
    const response = await fetch(serverApi + `/restaurant/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const receiveData = await response.json();
    if (response.status === 201) {
        return receiveData;
    }
}

async function deleteDataRequest(deletedId: number) {
    const response = await fetch(serverApi + '/ticket/' + deletedId +'/', {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    return response.status === 204;
};

export const ApiRequest = {
    getDataRequest,
    deleteDataRequest,
    addRestaurantDataRequest,
    addTicketDataRequest,
    updateDataRequest,
    purchaseTicketRequest,
    signUpRequest,
    logInRequest,
};