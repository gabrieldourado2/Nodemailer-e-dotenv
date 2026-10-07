const express = require("express");
const router = express.Router();
const {body, validationResult} = require('express-validator')
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure:true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        secure: false,
        ignoreTLS: true,
        rejectUnauthorized: false,
    }
})

router.get('/', (req,res) =>{
    res.render("pages/index")
})

router.post('/index', (req,res)=>{
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: req.body.assunto,
        text: req.body.mensagem,
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
        }else{
            console.log(info);
            console.log("Email enviado.")
        }
    })
})



module.exports = router;