const express = require('express');
const router = express.Router();
const User = require("../schema/UsersSchema")


router.get('/',async (req, res)=>{
    try{
        const user = await User.find()
        res.json(user);  
    }catch{
        res.json({message: err})
    }
});

router.get('/:username', async (req, res) => {
    try{
        const user = await User.findOne({username: req.params.username})
        res.json(user);  
    }catch{
        res.json({message: err})
    }
});
router.post("/", async(req, res)=>{ 
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });
    try{
        const savedUser = await user.save();
        res.json(savedUser);

    }catch{
        res.json({message: err});
    }
});
router.delete("/:username", async (req, res)=>{
    try{
        const removedUser= await User.remove({username: req.params.username});
        res.json(removedUser);
    }catch(err){
        res.json({message: err});
    }
    
});
router.patch("/:username", async (req,res)=>{
    try{
        const updatedUser = await User.updateOne({
            username: req.params.username},
            { $set:{ 
                username: req.body.username,
                password: req.body.password,
                role: req.body.role
                }
        });
        res.json(updatedUser);
    }catch(err){
        res.json({message: err});

    }
})


module.exports =  router;