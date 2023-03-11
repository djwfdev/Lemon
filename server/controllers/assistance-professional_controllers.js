// status codes are from httpstatuses.com
import AssistanceProfessionalData from '../models/assistance-professional_model.js';
import ServiceData from '../models/service_model.js';

// Gets all assistance professionals from the database using port 5000
export const getAssistProfs = async (req, res)=> {
    try {
        const allAssistProfs = await AssistanceProfessionalData.find();
        res.status(200).json(allAssistProfs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Gets a specific assistance professional using an assistProfID value
export const getAPsBySearch = async (req, res) => {
    const { assistProfID } = req.body;
    try {
        AssistanceProfessionalData.findOne({assistProfID:assistProfID})
        .then((ap) => {
            if(ap){
                res.json(ap)
            } else {
                console.log("No AP found");
            }
        })
    } catch (error) {
        res.json({ result: "error", message: error.message });
    }
}

// Edits a current assistance professional's values (i.e. changing their phone number to a different one)
export const assistProfEdit = async (req, res) => {
    const { firstName, lastName, dob, email, phoneNumber, password } = req.body;

    let savedAssistProf = await AssistanceProfessionalData.findOne({email:email});
    if(savedAssistProf && savedAssistProf._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") !== req.params.id){
        res.json({ result: "error", message: "An assistance professional already exists with that email!" });
    } else {
        AssistanceProfessionalData.findByIdAndUpdate(req.params.id, {$set: 
        { 
            firstName: firstName, 
            lastName: lastName, 
            dob: dob,
            email: email, 
            phoneNumber: phoneNumber, 
            password: password 
        }}, 
        { new: true }, 
        function (err, docs){
            if (err) 
                res.json({ result: "error", message: err.message });
            else 
                res.json({ result: "success", docs, message: "Updated user!" });
        })
    }
}

// Searches for an assistance professional's ID and returns the value (true or false)
function searchAssistProfID(newAssistProfID, callback){
    AssistanceProfessionalData.findOne({assistProfID:newAssistProfID})
    .then((savedAssistProfID)=>{
        if(savedAssistProfID){
            callback(true); 
        }
        else {
            callback(false);
        }
    })
}

// Using the values, it creates a new assistance professional account, and saves it to the database
export const assistProfSignup = async (req,res) => {
    const { firstName, lastName, gender, dob, email, phoneNumber, password} = req.body;
    var newAssistProfID = req.body;
    console.log(req.body)
    if(!firstName || !lastName || !gender || !dob || !email || !phoneNumber || !password){
        res.json({ result: "error", message:"Add all data!" })
    }
    let savedAssistProf = await AssistanceProfessionalData.findOne({email:email});
    let savedAssistProfNum = await AssistanceProfessionalData.findOne({phoneNumber:phoneNumber});

    if(savedAssistProf || savedAssistProfNum){
        res.json({ result: "error", message: "An assistance professional already exists with these details!" })
    } else {    
        var length = 0;
        AssistanceProfessionalData.find(req.body.assistProfID, function(err, docs){
            length = docs.length;
            newAssistProfID = 3000000 + length + 1; // 3000000 for the assistProfID's only.
            searchAssistProfID(newAssistProfID, function(result){
                if(result == false){
                    const newAssistProf = new AssistanceProfessionalData({
                        assistProfID: newAssistProfID,
                        firstName,
                        lastName,
                        gender,
                        dob,
                        email,
                        phoneNumber,
                        password,
                    })
                    newAssistProf.save()
                    .then((newAssistProf)=>{
                        res.json({ result: "success", message:"Saved the Assistance Professional successfully!" })
                        console.log("New email created: " + newAssistProf.email)
                        console.log("New assistProfID created: " + newAssistProf.assistProfID)
                    })
                } else {
                    res.json({ result: "error", message:"An Assistance Professional already exists with that assistProfID! Please try again" })
                }
            })
        })
    }
}


// Using an email and a password, it returns "success" if the email and password match what's in the database
export const assistProfLogin = async (req,res) => {
    let doc = await AssistanceProfessionalData.findOne({ email: req.body.email });
    if (doc) {
        if (doc.email === req.body.email && doc.password === req.body.password)
            res.json({ result: "success", doc, message: "Login Successful!"});
        else 
            res.json({ result: "error", message: "Invalid username or password"})
    } else {
        res.json({ result: "error", message: "Couldn't find member"})
    }
}

//For assigning random distances and populating the available jobs array in each assistance professional document
export const addAvailableJobs = async (service) => {
    try{
        AssistanceProfessionalData.find({}, 'assistProfID').lean().exec(async function (err, IDs){
            if(err){
            } else {
                for (var i = 0; i < IDs.length; i++){
                    // Random distance
                    var maxDist = 60; // no more than 60km away 
                    var randomDist = Math.round((Math.random() * (maxDist - 0) + 0)*10)/10; // 0 - 150km 

                    // Update the AP
                    if (randomDist <= 40){ // only add if within range 
                        var job = {
                            jobID: service.serviceID, 
                            serviceType: service.serviceType, 
                            plateNumber: service.vehicleForServicing, 
                            distanceFromAP: randomDist
                        };
                        AssistanceProfessionalData.findOneAndUpdate({assistProfID: IDs[i].assistProfID}, {$push: 
                        { 
                            availableJobs: job, 
                        }}, 
                        { new: true }, 
                        function (err, docs){
                            if (err) {
                                res.json({ result: "error", message: err.message });
                            }
                        });
                    }
                }
            }
        });
    }
    catch (error){
        console.error(error);
    }
}

// When called, it updates the available jobs array and removes the element with the specific serviceID from the array
export const denyAPtoService = async (req, res) => {
    try {
        // Remove singular job from AP 
        AssistanceProfessionalData.findOneAndUpdate(req.params.id, {$pull: 
        { 
            availableJobs: {jobID: req.body.serviceID},
        }}, 
        { new: true },
        function (err, doc){
            if (err) {
                res.json({ result: "error", message: err.message });
            } else { 
                res.json({ result: "success", doc, message: "Removed job!"}); 
            }
        });
    }
    catch (err) {
        res.json({ result: "error", message: err.message }); 
        console.error(err);
    }
}

// When called, it updates the available jobs array and removes the element
// with the specific serviceID from the array, but also assigns the serviceID's document with an assistProfID
export const assignAPToService = async (req, res) => {
    try {
        // Assign AP to service 
        let service = await ServiceData.findOneAndUpdate({ serviceID: req.body.serviceID },{ assistProfID: req.body.assistProfID },{ new: true });
        await service.save();  

        // Clean Up Available jobs
        await AssistanceProfessionalData.updateMany({}, {$pull: 
        { 
            availableJobs: {jobID: req.body.serviceID},
        }}, 
        { new: true }); // remove service (job) from all APs

        let doc = await AssistanceProfessionalData.findOne({ assistProfID: req.body.assistProfID });
        if (doc)
            res.json({ result: "success", doc, message: "Assigned AP to service!"});
        else 
            res.json({ result: "error", message: "Couldn't find AP!"});                
    } 
    catch (err) {
        res.json({ result: "error", message: err.message }); 
        console.error(err);
    }   
}