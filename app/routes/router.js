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

router.post('/index',
body('nome').notEmpty().withMessage('Preencha o nome').bail().isLength({min:3}).withMessage('Nome de no minimo 3 caracteres'),
body('email').notEmpty().withMessage('Preencha o email').bail().isEmail().withMessage('Isso não é um email válido'),
body('telefone').notEmpty().withMessage('Preencha o telefone').bail().isLength({min:7, max:11}).withMessage('Número de no minimo de 7 caracteres, máximo de 11 caracteres'),
body('assunto').notEmpty().withMessage('Preencha o assunto'),
body('mensagem').notEmpty().withMessage('Escreva sua mensagem'),
(req,res)=>{
    validacaoArray = validationResult(req).array();
    var erros = "";
    var mensagem = 'Nome: ' + req.body.nome + '   ' +'Mensagem: ' + req.body.mensagem + '   ' + 'Telefone: ' + req.body.telefone;

     if(validacaoArray.length >= 1){ //verifica se tem erro
        for(let i = 0; i < validacaoArray.length; i++){ //percorre os erro
            erros += `${validacaoArray[i].msg}<br>` //add os erro na variavel vazia
        }
        res.send(erros) //printa os erro
        return
     }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: req.body.assunto,
        text: mensagem
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