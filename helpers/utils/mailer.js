const nodemailer = require('nodemailer');

transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPWD
    }
});


const sendEmail = (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL ,
            to: to ,
            subject: subject ,
            text: text
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }catch (e) {
        throw e.message ;
    }
};

module.exports = {
    sendEmail
};