const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

async function sendConfirmationMail(to, confirmationToken) {
    let mailOptions = {
        from: '"Note Manager 👻" <'+process.env.MAIL+'>', // sender address
        to: to, // list of receivers
        subject: "Welcome to note manager ✔", // Subject line
        text: "Please confirm your account with this token = "+confirmationToken, // plain text body
        html: "<a href="+process.env.CONFIRM_EMAIL_URL+"/"+confirmationToken+">Click to activate your account</a>" // html body
    };
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)
    // console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports.sendConfirmationMail = sendConfirmationMail;
