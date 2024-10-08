const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();


app.use(cors());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


app.post('/send-email', async (req, res) => {
    const { name, email, description } = req.body;

 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'joaov.bombo.guimaraes@gmail.com', 
            pass: 'gbbu elxj lfqq otca',
        }
    });

    const mailOptions = {
        from: email, 
        to: 'joaov.bombo.guimaraes@gmail.com', 
        subject: `Mensagem de ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\nDescrição: ${description}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado:', info.response); 
        res.send({ success: true, message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar email:', error); 
        if (error.response) {
            console.error('Resposta do erro:', error.response);
        }
        res.status(500).send({ success: false, message: 'Falha ao enviar email.' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});