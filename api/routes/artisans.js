const Artisan = require('../models/Artisans');
const {verifyTokenAuthorization, verifyTokenAdmin } = require('./verifyToken');

const router = require('express').Router();

const multer = require('multer');
const User = require('../models/User');
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'../client/public/assets/')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
});
const upload = multer({storage:storage})

router.post("/", upload.array("photos",4), async (req,res)=>{
    const newBusProfile = new Artisan({
        email:req.body.email,
        bio:req.body.bio,
        featuredPhotos:req.files,
        registrationNumber:req.body.registrationNumber,
        businessName:req.body.businessname,
        userId:req.body.userId,
    });
    const search = await Artisan.findOne({email:req.body.email});
    if(!search){
        try{
            const uploadBus = await newBusProfile.save();
            res.status(200).json(uploadBus);
        }
        catch(err){
            res.status(500).json(err);
            console.log(err);
        } 
    }
    else{
        res.status(300).json({message:"File Already Exists"});
    }
});

//change artisan data;
router.post("/:id",verifyTokenAuthorization,async (req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }
    try{
        const updatedUser = await Artisan.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//delete artisan;
router.post("/delete/:id", verifyTokenAdmin, async (req,res)=>{
    try{
        const deleted = await Artisan.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({message:"User has been deleted"});
    }
    catch(err){
        res.status(500).json({'message':err});
        console.log(err);
    }
})

//get artisan
router.get("/:id",verifyTokenAuthorization, async (req,res)=>{
    try{
        const user = await Artisan.find({userId:req.params.id});
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

router.get("/artisans/:id", async (req,res)=>{
    try{
        const user = await Artisan.find({userId:req.params.id});
        res.status(200).json({users:user});
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//get all artisan;
router.get('/', async (req,res)=>{
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