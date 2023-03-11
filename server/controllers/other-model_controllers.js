//'req' stands for request and 'res' stands for response
// status codes are from httpstatuses.com
import CustomerData from '../models/customer_model.js';
import VehicleData from '../models/vehicle_model.js';
import LocationData from '../models/location_model.js';
import MotoristData from '../models/motorist_model.js';

// Gets all customers from the database using port 5000 
export const getCustomers = async (req, res)=> {
    try {
        const allCustomers = await CustomerData.find();
        res.status(200).json(allCustomers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Gets all locations from the database using port 5000
export const getLocations = async (req, res)=> {
    try {
        const allLocations = await LocationData.find();
        res.status(200).json(allLocations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Gets all motorists from the database using port 5000
export const getMotorists = async (req, res)=> {
    try {
        const allMotorists = await MotoristData.find();
        res.status(200).json(allMotorists);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Gets all vehicles from the database using port 5000
export const getVehicles = async (req, res)=> {
    try {
        const allVehicles = await VehicleData.find();
        res.status(200).json(allVehicles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}