const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//connecting to db
mongoose.connect("mongodb://127.0.0.1:27017/employeeDb")
.then(()=>{
    console.log("Connected to DB successfully")
    app.listen(PORT, ()=>{
        console.log("Server is running")

    })
})
.catch((err)=>{
    console.log(err);
})

//schema for employees
const employeeSchema = mongoose.Schema({
  f_id:Number,
  f_image:String,
  f_name:String,
  f_email:String,
  f_mobile:Number,
  f_designation:String,
  f_gender:String,
  f_course:String,
  f_createDate: { type: Date, default: Date.now }
},{
timestamps:true
})

const employeeModel = mongoose.model("t_Employee",employeeSchema)



//schema for user login
const loginSchema = mongoose.Schema({
    f_sno: Number,
    f_userName: String,
    f_Pwd: String
  }, {
    timestamps: true
  });
  
  const loginModel = mongoose.model("t_Login", loginSchema);


  //read
  app.get("/",async(req,res)=>{
    const data = await employeeModel.find({})
    res.json({success:true,data:data})
  })
  
  //create
  app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new employeeModel(req.body)
    await data.save()
    res.send({success:true,message:"Data saved successfully",data:data})
  })

  //update
  app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {f_id,...rest} = req.body
    console.log(rest)
    const data = await employeeModel.updateOne({f_id:f_id},rest)
    res.send({success:true,message:"Data Updated successfully",data:data})
  })

  //delete
  app.use("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await employeeModel.deleteOne({_id:id})
    res.send({success:true,message:"Data deleted successfully"})
  })

  //user login API
  app.post("/login", async (req, res) => {
    const { f_userName, f_Pwd } = req.body;
    const user = await loginModel.findOne({ f_userName, f_Pwd });
    if (user) {
      res.json({ success: true, message: "Login successful", user });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  });


  