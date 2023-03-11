import SubscribedMemberData from "../models/subscribed-member_model.js";
import CustomerData from "../models/customer_model.js";
import MotoristData from "../models/motorist_model.js";
import LocationData from "../models/location_model.js";
import VehicleData from "../models/vehicle_model.js";
import ServiceData from "../models/service_model.js";
import { addAvailableJobs } from "./assistance-professional_controllers.js";

// Making the customer form, we use the following:
// Customer class = firstName, lastName, phoneNumber,
// Location class = streetName, streetNum(if applicable, default is '1'), suburb, nearestCrossroad[streetOne, streetTwo],
// Vehicle class = plateNumber, manufacturer, model, year, body_type, colour,
// Service class = serviceType(what the AP is servicing)

// When the form is submitted, all of the data is then created in their respective collections in the database
export const createCustomerForm = async (req, res) => {
    const {
        firstName,
        lastName,
        phoneNumber,
        streetName,
        streetNum,
        suburb,
        nearestCrossroadArr,
        plateNumber,
        manufacturer,
        model,
        year,
        body_type,
        colour,
        serviceType,
    } = req.body;

    var newServiceID = req.body;
    var newCustomerID = req.body;
    var newMotoristID = req.body;
    var nearestCrossroad = nearestCrossroadArr[0] + "-" + nearestCrossroadArr[1];

    if (!firstName || !lastName || !phoneNumber || !streetName || !suburb || !nearestCrossroad || !plateNumber || !manufacturer || !model || !year || !body_type || !colour) {
        console.log("Not all data included");
        res.json({ result: "error", message: "Need to include all required data!" });
    }

    var serviceTypePrice = 0;
    var serviceTypeArr = ["Flat Tyre", "Flat Battery", "Engine Overheating", "Car Won't Start", "Can't Get In Car"];

    if (serviceType === "Unknown") {
        var randomValue = Math.round(Math.random() * 5);
        serviceType = serviceTypeArr[randomValue];
    } 
    else if (serviceType === "Flat Battery") 
        serviceTypePrice = 200;
    else if (serviceType === "Engine Overheating") 
        serviceTypePrice = 100;
    else if (serviceType === "Car Won't Start") 
        serviceTypePrice = 150;
    else if (serviceType === "Can't Get In Car") 
        serviceTypePrice = 75;
    else if (serviceType === "Flat Tyre") 
        serviceTypePrice = 150;

    var customer_length = 0;
    var service_length = 0;

    CustomerData.find(req.body.customerID, function (err, doc) {
        customer_length = doc.length;
        newCustomerID = 1000000 + customer_length + 1; // 1000000 for the customerID's only.
        const newCustomer = new CustomerData({
            customerID: newCustomerID,
            firstName,
            lastName,
            phoneNumber,
        });
        newCustomer.save().then((newCustomer) => {
            console.log("New customer created: " + newCustomer.firstName + " " + newCustomer.lastName);
            console.log("New customerID created: " + newCustomer.customerID);
        });
        newMotoristID = newCustomerID;
        const newMotorist = new MotoristData({
            motoristID: newMotoristID,
            vehicles: [{ plateNumber }],
        });
        newMotorist.save().then((newMotorist) => {
            console.log("New motorist created: " + newMotorist.motoristID);
        });

        const newLocation = new LocationData({
            streetName,
            streetNum,
            suburb,
            nearestCrossroad,
            userID: newMotoristID,
        });
        newLocation.save().then((newLocation) => {
            console.log("New location created: " + newLocation.streetNum + " " + newLocation.streetName + ", " + newLocation.suburb);
        });

        ServiceData.find(req.body.serviceID, function (err, docs) {
            service_length = docs.length;
            newServiceID = 5000000 + service_length + 1; // 5000000 for the serviceID's only.
            const newService = new ServiceData({
                serviceID: newServiceID,
                motoristID: newMotoristID,
                vehicleForServicing: plateNumber,
                serviceType,
                serviceTypePrice,
            });
            newService.save().then((newService) => {
                addAvailableJobs(newService);
                res.json({ result: "success", newService, message: "Service successfully submitted" });
                console.log("New service created: " + newService.serviceType);
            });
        });
    });
    const newVehicle = new VehicleData({
        plateNumber: plateNumber,
        manufacturer,
        model,
        year,
        body_type,
        colour,
    });
    newVehicle.save();
};

// Making the member form, we use the following:
// Subscribed Member class = firstName, lastName, phoneNumber,
// Location class = streetName, streetNum(if applicable, default is '1'), suburb, nearestCrossroad[streetOne, streetTwo],
// Vehicle class = plateNumber, manufacturer, model, year, body_type, colour,
// Service class = serviceType(what the AP is servicing)

// When the form is submitted, all of the data is then created in their respective collections in the database
export const createMemberForm = async (req, res) => {
    const {
        firstName,
        lastName,
        phoneNumber,
        streetName,
        streetNum,
        suburb,
        nearestCrossroadArr,
        plateNumber,
        manufacturer,
        model,
        year,
        body_type,
        colour,
        serviceType,
    } = req.body;

    var newServiceID = req.body;
    var newMotoristID = req.body;
    var service_length = 0;
    var nearestCrossroad = nearestCrossroadArr[0] + "-" + nearestCrossroadArr[1];

    if (!firstName || !lastName || !phoneNumber || !streetName || !suburb || !nearestCrossroad || !plateNumber || !manufacturer || !model || !year || !body_type || !colour) 
        res.json({ result: "error", message: "Need to include all required data!" });

    var serviceTypePrice = 0;
    var serviceTypeArr = ["Flat Tyre", "Flat Battery", "Engine Overheating", "Car Won't Start", "Can't Get In Car"];

    if (serviceType === "Unknown") {
        var randomValue = Math.round(Math.random() * 5);
        serviceType = serviceTypeArr[randomValue];
    } 
    else if (serviceType === "Flat Battery") 
        serviceTypePrice = 200;
    else if (serviceType === "Engine Overheating") 
        serviceTypePrice = 100;
    else if (serviceType === "Car Won't Start") 
        serviceTypePrice = 150;
    else if (serviceType === "Can't Get In Car") 
        serviceTypePrice = 75;
    else if (serviceType === "Flat Tyre") 
        serviceTypePrice = 150;

    SubscribedMemberData.findOne({ phoneNumber: phoneNumber }).then((savedMember) => {
        if (savedMember) {
            newMotoristID = savedMember.memberID;
            // checking to see if a motorist with that memberID exists in the 'motorists' collection
            MotoristData.findOne({ motoristID: newMotoristID }).then((savedMotorist) => {
                if (savedMotorist) {
                    // is a saved motorist, add details to document
                    // details includes only a vehicle, so if the vehicle already exists in there, do nothing, otherwise add the vehicle into the document
                    MotoristData.findOne({
                        vehicles: { $elemMatch: { plateNumber: req.body.plateNumber } },
                    }).then((savedPlateNumber) => {
                        if (!savedPlateNumber) {
                            // doesn't exist, so we add it to the vehicles array
                            MotoristData.findOneAndUpdate(
                                { motoristID: savedMotorist.motoristID },
                                {
                                    $push: {
                                        vehicles: { plateNumber },
                                    },
                                },
                                { new: true },
                                function (err, docs) {
                                    if (err) res.json({ result: "error", message: err.message });
                                    else console.log("Added new car: " + plateNumber);
                                }
                            );
                        }
                    });
                } else {
                    // not a saved motorist, create a new motorist
                    const newMotorist = new MotoristData({
                        isMember: true,
                        motoristID: newMotoristID,
                        vehicles: [{ plateNumber }],
                    });
                    newMotorist.save().then((newMotorist) => {
                        console.log("New motorist created: " + newMotorist.motoristID);
                    });

                    // needs to create a vehicle as they are a new motorist
                    const newVehicle = new VehicleData({
                        plateNumber,
                        manufacturer,
                        model,
                        year,
                        body_type,
                        colour,
                    });
                    newVehicle.save();
                }
            });
            // locations are always new, so create one regardless
            const newLocation = new LocationData({
                streetName,
                streetNum,
                suburb,
                nearestCrossroad,
                userID: newMotoristID,
            });
            newLocation.save().then((newLocation) => {
                console.log("New location created: " + newLocation.streetNum + " " + newLocation.streetName + ", " + newLocation.suburb);
            });

            // services are always new, so create one regardless
            ServiceData.find(req.body.serviceID, function (err, doc) {
                service_length = doc.length;
                newServiceID = 5000000 + service_length + 1; // 5000000 for the serviceID's only.
                const newService = new ServiceData({
                    serviceID: newServiceID,
                    motoristID: newMotoristID,
                    vehicleForServicing: plateNumber,
                    serviceType,
                    serviceTypePrice,
                    callOutFee: 0,
                });
                newService.save().then((newService) => {
                    addAvailableJobs(newService);
                    res.json({ result: "success", newService, message: "Service sucessfully submitted" });
                    console.log("New service created: " + newService.serviceType);
                });
            });
        } else {
            res.json({ result: "error", message: "You are not a member. Please fill out customer form" });
        }
    });
};
