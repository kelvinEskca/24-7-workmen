const Category = require('../models/Category');
const {verifyToken, verifyTokenAuthorization, verifyTokenAdmin } = require('./verifyToken');
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
})

const upload = multer({storage:storage})

router.post("/",verifyTokenAdmin, upload.array("photos",4), async (req,res)=>{
    try{
        const search = await Category.findOne({categoryname:req.body.categoryname});
        if(!search){
            const newCategory = new Category({
                categoryname:req.body.categoryname,
                image:req.files
            })
            try{
                const uploadCategory = await newCategory.save();
                res.status(200).json(uploadCategory);
            }
            catch(err){
                res.status(500).json(err);
                console.log(err);
            }
        }
        else{
            res.status(300).json({message:"File Already Exists"});
        }
    }
    catch(err){
        console.log(err);
    }
});

//get all category;
router.get('/', async (req,res)=>{
    try{
        const category = await Category.find();
        const total = category.length;
        const categories = await User.aggregate([
            {
                $group: {
                _id: '$category',
                count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({total:total,category:category,categories:categories});
    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }
});

//delete category
router.post("/delete/:id", verifyTokenAdmin, async (req,res)=>{
    try{
        const deleted = await Category.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({message:"Category has been deleted"});
    }
    catch(err){
        res.status(500).json({'message':err});
        console.log(err);
    }
})

//get category
router.get("/:id",verifyTokenAuthorization, async (req,res)=>{
    try{
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});


module.exports = router