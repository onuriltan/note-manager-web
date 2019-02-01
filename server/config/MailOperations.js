const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});


function sendConfirmationMail(to, confirmationToken) {
    let mailOptions = {
        from: '"Note Manager 👻" <' + process.env.MAIL + '>', // sender address
        to: to, // list of receivers
        subject: "Welcome to note manager ✔", // Subject line
        text: "Please confirm your account with this token = " + confirmationToken, // plain text body
        html: "<a href=" + process.env.CONFIRM_EMAIL_URL + "/" + confirmationToken + ">Click to activate your account</a>" // html body
    };
    // send mail with defined transport object
    return new Promise(function(resolve, reject) {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });

}

module.exports.sendConfirmationMail = sendConfirmationMail;
