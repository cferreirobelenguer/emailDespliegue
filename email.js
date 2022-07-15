
//Se llama a las dependencias de nodemailer y express
var nodemailer=require("nodemailer");
var express=require("express");
//Se ejecuta express con app
var app=express();
//Con body parser vamos a poder coger los parámetros del body, vamos a poner como parámetro el email
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Importamos dotenv
require('dotenv').config()


//Activar el CORS para permitir peticiones desde el frontend
// Configurar cabeceras y cors
//middleware que se ejecuta antes de las rutas que tengamos
app.use((req, res, next) => {
    //Configuramos el control de acceso para que cualquier cliente pueda hacer peticiones ajax
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    //permitimos métodos http 
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Envío de petición mediante post
app.post("/send-email/",(req,res)=>{
    const {email} = req.body;
    //Datos de la cuenta que envía el mensaje
    let transport = nodemailer.createTransport({
        service: "Outlook365",
        host: "smtp.office365.com",
        port: "587",
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },
        auth: {
            //Usuario y contraseña que envía el mensaje
            user: 'xxxxt@outlook.es',
            pass: 'xxxxxx'
        },
        
    });
    //Datos del mensaje, el remitente y el receptor, asunto y contenido
    const message = {
        from: 'beautyBot@outlook.es', // Dirección de remitente
        to: email,         // Dirección de desinatario
        subject: 'Te estábamos esperando 🤩', // Asunto del mensaje
        //Código html del mensaje con estilos integrados y fuentes importadas en google fonts
        html: `<!doctype html>
        <html>
            <head>
            <meta charset="utf-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,200&display=swap');
            </style>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Ovo&family=Roboto+Flex:opsz,wght@8..144,200&display=swap');
            </style>
            <style>
                body{
                        visibility:hidden;
                        text-align:center;
                        margin:auto;
                        font-size:4vw;
                        font-family: 'Shadows Into Light Two', cursive;
                        padding:50px;
                    }
                .portada{
                    background-color:#FFF7EF;
                    color: #323C3D;text-align:center;
                    padding:20px;font-size:4vw;
                    font-family: 'Ovo', serif
                }

                .redes{
                    background-color: #FEB3BA;
                    color: #323C3D;text-align:center;
                    padding:20px;font-family: 'Roboto Flex', sans-serif;
                    text-decoration: none; 
                }
            </style>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light+Two&display=swap');
            </style>
            </head>
            <body>
                <div class="portada">
                    <br>
                    <img src="https://i.pinimg.com/originals/35/b0/4d/35b04dbf33af4a54f9200a07781931b7.jpg" width="200" height="200/>
                    <br>
                    <br>
                    <p>Muchas gracias por subscribirte a nuestra newsletter 💓<br>Pronto recibirás, descuentos y muchas sorpresas más!</p>
                    <br>
                    <br>
                    <img src="https://i.pinimg.com/originals/93/ea/b2/93eab279d35f9a492da6c7ba9a48f533.jpg" width="600" height="1000"/>
                    <br>
                    <p>Recuerda que si tienes dudas sobre nuestros productos, tienes nuestro servicio de chat en facebook y en nuestra web 😊</p>
                    <p>Cada més recibirás sorpresas 💄 y descuentos para cuando vengas a visitarnos. 😘</p>
                    <br>
                    <p>Pronto tendrás noticias nuestras 😍😍😍😍</p>
                    <img src="https://i.pinimg.com/originals/37/51/d4/3751d4f95e079586a52b8904589f0841.jpg" width="100" height="100"/>
                    <br>
                    <br>
                    <br>
                </div>
                <div class="redes">
                        <br>
                        <br>
                        <p>Síguenos</p>
                        <a href="https://www.facebook.com/BeautyBot-112006418152929"><img src="https://i.pinimg.com/originals/71/90/e5/7190e52cb11a55104c3432891841164f.jpg" width="50" height="50"/></a>&nbsp;&nbsp;&nbsp;<a href="https://twitter.com/beautycenterBot"><img src="https://i.pinimg.com/originals/b9/8d/fb/b98dfb64c279c9f9ac73236029f8bdf3.jpg" width="50" height="50"/></a>
                        <br>
                        <p>Puedes mandarnos un email en 📧</p>
                        <p>beautyBot@outlook.es<p>
                        <br>
                        <br>
                </div>
            </body>
        </html>`
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
            //Si 500 o 400 error
            console.log(err)
        } else {
            //Si 200 emnsaje enviado
            console.log("email enviado correctamente");
            console.log(info);
        }
    });

});

//Puerto local 3005 escuchando
app.listen(process.env.PORT || 3005, '0.0.0.0',()=>{
	console.log("servidor email conectado correctamente");

});

