import ServiceData from '../models/service_model.js';

// Gets all services from the database using port 5000 
export const getServices = async (req, res)=> {
    try {
        const allServices = await ServiceData.find();
        res.status(200).json(allServices);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Deletes a service from the database
export const deleteService = async (req, res)=> {
    const id = req.params.id;
    try {
        await ServiceData.findByIdAndRemove(id).exec();
        res.status('Successfully deleted');
    } catch (error) {
        console.log(error);
    }
}

// Returns the updated service document based on the current serviceID
export const getUpdatedServices = async (req, res) => {
    let docs = await ServiceData.findOne({ serviceID: req.body.serviceID });
    if (docs) {
        res.json({ result: "success", docs, message: "Service request data found!"});
    } else {
        res.json({ result: "error", message: "Couldn't find form"});
    }
}