import SubscribedMemberData from '../models/subscribed-member_model.js';

// Takes a first name, last name and phone number, searches for a subscribed member in the database, and returns the member if one is found
export const getMembersBySearch = async (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;
    try {
        const fName = new RegExp(firstName, 'i');
        const lName = new RegExp(lastName, 'i');
        const pNumber = new RegExp(phoneNumber, 'i');
        SubscribedMemberData.findOne({ $and : [{firstName:fName}, {lastName:lName}, {phoneNumber:pNumber}]})
        .then((savedMember) => {
            if(savedMember){
                res.json(savedMember)
            } else {
                console.log("no member found?");
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Using an email and a password, it returns "success" if the email and password match what's in the database
export const subMemberLogin = async (req,res)=> {
    let doc = await SubscribedMemberData.findOne({ email: req.body.email });
    if (doc) {
        if (doc.email === req.body.email && doc.password === req.body.password)
            res.json({ result: "success", doc, message: "Login Successful!"});
        else 
            res.json({ result: "error", message: "Invalid username or password"})
    } else 
        res.json({ result: "error", message: "Couldn't find member"})
}

// Searches for a subscribed member's ID and returns the value (true or false)
function searchMemberID(newMemberID, callback){
    SubscribedMemberData.findOne({memberID:newMemberID})
    .then((savedMemberID)=>{
        if(savedMemberID){
            callback(true); 
        }
        else {
            callback(false);
        }
    })
}

// Edits a current subscribed member's values (i.e. changing their phone number to a different one)
export const subMemberEdit = async (req, res) => {
    const { firstName, lastName, dob, email, phoneNumber, password } = req.body;

    let savedMember = await SubscribedMemberData.findOne({email:email});
    console.log(req.params.id); 
    if(savedMember && savedMember._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") !== req.params.id)
        res.json({ result: "error", message: "A member already exists with that email!" });
    else {
        SubscribedMemberData.findByIdAndUpdate(req.params.id, {$set: 
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

// Using the values, it creates a new subscribed member account, and saves it to the database
export const subMemberSignup = async (req,res) => {
    const {firstName, lastName, phoneNumber, gender, dob, email, password} = req.body;
    var newMemberID = req.body;
    console.log(req.body)
    if(!firstName || !lastName || !phoneNumber || !gender || !dob || !email || !password){
        return res.json({ result: "error", message:"Add all data!" })
    }
    let savedMember = await SubscribedMemberData.findOne({ email:email }); 
    let savedMemberNum = await SubscribedMemberData.findOne({ phoneNumber:phoneNumber }); 
    if(savedMember || savedMemberNum){
        return res.json({ result: "error", message:"A member already exists with these details!" })
    } else {    
        var length = 0;
        SubscribedMemberData.find(req.body.memberID, function(err, docs){
            length = docs.length;
            newMemberID = 2000000 + length + 1; // 2000000 for the memberID's only.
            searchMemberID(newMemberID, function(result){
                if(result == false){
                    const newSubMember = new SubscribedMemberData({
                        memberID: newMemberID,
                        firstName,
                        lastName,
                        phoneNumber,
                        gender,
                        dob,
                        email,
                        password,
                    })
                    newSubMember.save()
                    .then((newSubMember)=>{
                        res.json({ result: "success", message:"Saved the Assistance Professional successfully!" })
                        console.log("New email created: " + newSubMember.email)
                        console.log("New memberID created: " + newSubMember.memberID)
                    })
                } else {
                    return res.json({ result: "error", message:"A member already exists with that memberID! Please try again" })
                }
            })
        })
    }
}
