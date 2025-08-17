import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import nodemailer from "nodemailer";
import { Food } from './Express_2.js';
dotenv.config();
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


app.get('/', (req, res) => {
  res.send('Hello from Node.js with import!');
});

app.get('/display',async(req,res)=>{
  const response=await Food.find()
  //console.log(response);
  res.json({message:response})
})

app.post('/addfood',async(req, res) => {
  try 
  {
    const{foodname,foodprice,image}=req.body
    const adddata=await Food.insertOne({
      foodname:foodname,
      foodprice:foodprice,
      image:image
    })
    //console.log(adddata);
    res.json({message:"Food Add Successfully"})
  } 
  catch (error) 
  {
    res.json({message:"Food Already Added"})
  }
});

app.post('/deletedata', async(req, res) => {
  try 
  {
    const{_id}=req.body
    const datadelete=await Food.deleteOne({_id:_id})
    //console.log(datadelete);
    
    res.json({message:"Food Deleted Successfully"});
  } 
  catch (error)
  {
    res.json({message:"Food Deleted Failed"});
  }
  
});

app.post('/update',async(req, res) => {
  const{foodname,foodprice,_id,image}=req.body
  try 
  {
    const response=await Food.updateOne({_id:_id},{$set:{foodname:foodname,foodprice:foodprice,image:image}})
    res.json({message:"Update Successfully"});
  } 
  catch (error) 
  {
    res.json({message:"Update Failed"});
  }
  
  
});

app.post('/sendmail',async(req,res)=>{
  const {to,subject,message} = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "praveen.aeropilot@gmail.com",
        pass: "amdw cmdy ysfn frpn"
      }
    });

    await transporter.sendMail({
      from: "praveen.aeropilot@gmail.com",
      to,
      subject,
      text: message
    });

    res.json({ message: "Email Sent Successfully to Admin" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Send Email", error: error.message });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
