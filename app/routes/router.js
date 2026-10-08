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

router.post('/index',body('nome').notEmpty().withMessage('Preencha o nome').bail().isLength({min:3}).withMessage('Senha de no minimo 3 caracteres'),body('email').notEmpty().withMessage('Preencha o email').bail().isEmail(),body('telefone'),body('telefone').notEmpty(),body('assunto').notEmpty().withMessage('Preencha o assunto'),body('mensagem').notEmpty().withMessage('Escreva sua mensagem'),(req,res)=>{
    validacaoArray = validationResult(req).array();
    validacaoArray = validationResult(req).array();

     if(validacaoArray.length >= 1){
        for(let i = 0; i < 4; i++){
            console.log(validacaoArray[i].msg)
        }
     }

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
            res.send('Email enviado com sucesso!')
        }
    })
})



module.exports = router;