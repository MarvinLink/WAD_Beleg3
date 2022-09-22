const express = require('express');
const router = express.Router();
const Contact = require("../schema/ContactsSchema")


router.get('/',async (req, res)=>{
    try{
        const contact = await Contact.find()
        res.json(contact);  
    }catch{
        res.json({message: err})
    }
});

router.get('/:contactFirstname', async (req, res) => {
    try{
        const contact = await Contact.findOne({firstname: req.params.contactFirstname})
        res.json(contact);  
    }catch{
        res.json({message: err})
    }
});
router.post("/", async(req, res)=>{ 
    const contact = new Contact({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        StreetAndNumber: req.body.StreetAndNumber,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        phone: req.body.phone,
        dateOfBirth: req.body.dateOfBirth,
        owner: req.body.owner,
        vis: req.body.vis,
        
    });
    try{
        const savedContact = await contact.save();
        res.json(savedContact);

    }catch{
        res.json({message: err});
    }
});
router.delete("/:contactFirstname", async (req, res)=>{
    try{
        const removedContact= await Contact.remove({firstname: req.params.contactFirstname});
        res.json(removedContact);
    }catch(err){
        res.json({message: err});
    }
    
});
router.put("/:contactFirstname", async (req,res)=>{
    try{
        const updatedContact = await Contact.updateOne({
            firstname: req.params.contactFirstname},
            { $set:{ 
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                StreetAndNumber: req.body.StreetAndNumber,
                zip: req.body.zip,
                city: req.body.city,
                country: req.body.country,
                phone: req.body.phone,
                dateOfBirth: req.body.dateOfBirth,
                owner: req.body.owner,
                vis: req.body.vis,
                
            }
        });
        res.json(updatedContact);
    }catch(err){
        res.json({message: err});

    }
})

module.exports = router;

