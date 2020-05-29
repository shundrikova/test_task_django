import React from "react";
import "./style.css";
import {appState} from "../../mobx/state/AppState";
import { useHistory } from "react-router-dom";



const CreateRestaurant = () => {
    const history = useHistory();

    const currentRestaurantNameTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const getTextAreaValue: string = e.target.value;
        appState.setRestaurantName(getTextAreaValue);
    };

     const createRestaurant = async () => {
        await appState.createRestaurant();
        history.push("/")
    };

    return( <div className="create-restaurant-main">
        <label>Input restaurant name</label>
        <input type='text' onChange={currentRestaurantNameTextChange}/>
        <input className="create-restaurant-main_create-button" type='button' value='create' onClick={createRestaurant}/>
    </div>);
};

export default CreateRestaurant;