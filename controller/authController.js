const Admin = require("../models/admin")
const Students = require("../models/students")
exports.login = async(req,res)=>{
    console.log("hello");
    const {email,password} = req.body;

    const admin = await Admin.findOne({email:email});
    if(!admin){
        return  res.status(401).send('Invalid Email or Password');
    }

    if(admin.password!==password)
    {
        return  res.status(401).json('Email or Password is incorrect');

    }

    res.json({status:"loggedIn"});
}

exports.update = async(req,res)=>{
    try{
    const {email} = req.params;

    await Students.findOneAndUpdate({email:email}, req.body);

    const  student = await Students.find()

    res.json({
        status:'updated',
        students:students
    })

    }catch(err)
    {
        res.json({
            status:'fail',
            error:err
        })
    }

}

exports.deleteData = async(req,res)=>{
    try{
    const  email=req.query.email;

    await Students.findOneAndDelete({email:email})

    res.json({
        ststus:"succes"
    })
    }catch(err)
    {
        res.json({
            ststus:"failed"
        })
    }
}

exports.deleteEntry = async(req,res)=>{
    try{
        const email = req.params.email;

        console.log(email);

        await Students.findOneAndDelete({email:email});

        res.json({status:"deleted"})
    }
    catch(err)
    {
        res.json({
            status:"fail",
            error:err
        })
    }
}