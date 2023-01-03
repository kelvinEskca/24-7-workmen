const User = require('../models/User');
const { verifyToken, verifyTokenAuthorization, verifyTokenAdmin } = require('./verifyToken');

const router = require('express').Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'../client/public/assets/')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})
const upload = multer({storage:storage})

//change user data;
router.post("/:id",verifyTokenAuthorization,upload.array("photos",4),async (req,res)=>{
    const userdata = ({
        firstname:req.body.firstname,
        phone:req.body.phone,
        lastname:req.body.lastname,
        image:req.files,
        username:req.body.username,
        category:req.body.category,
        city:req.body.city,
        title:req.body.title,
        postalcode:req.body.postalcode,
        company:req.body.company,
        address:req.body.address,
        country:req.body.country,
        aboutme:req.body.aboutme,
    })
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }
    try{
        const updatedUser = await User.findByIdAndUpdate({_id:req.params.id},{
            $set:userdata
        },{new:true})
        console.log(updatedUser);
        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//delete user;
router.post("/delete/:id", verifyTokenAdmin, async (req,res)=>{
    try{
        const deleted = await User.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({message:"User has been deleted"});
    }
    catch(err){
        res.status(500).json({'message':err});
        console.log(err);
    }
})

//get user
router.get("/:id",verifyTokenAdmin, async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//get all users;
router.get('/', verifyTokenAdmin, async (req,res)=>{
    try{
        const users = await User.find({isArtisan:false,isAdmin:false});
        const total = users.length;
        res.status(200).json({users:users, total:total});
        
    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }
});

//get all artisans;
router.get('/artisans', verifyTokenAdmin, async (req,res)=>{
    try{
        const users = await User.find({isArtisan:true,isAdmin:false});
        const total = users.length;
        res.status(200).json({users:users, total:total});
    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }
});

router.get('/users/artisans', async (req,res)=>{
    try{
        const users = await User.find({isArtisan:true,isAdmin:false});
        res.status(200).json({users:users});
    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }
});

router.get('/artisans/:id', async (req,res)=>{
    try{
        const users = await User.find({isArtisan:true,isAdmin:false});
        const total = users.length;
        res.status(200).json({users:users, total:total});
    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }
});

module.exports = router