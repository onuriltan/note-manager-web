const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: "Yandex",
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});


function sendConfirmationMail(to, confirmationToken) {
    let mailOptions = {
        from: '"📒 NOTE MANAGER 📒" <' + process.env.MAIL + '>', // sender address
        to: to, // list of receivers
        subject: "Welcome to Note Manager ✔", // Subject line
        text: "Please confirm your account with this token = " + confirmationToken, // plain text body
        html: "<a href=" + process.env.CONFIRM_EMAIL_URL + "/" + confirmationToken + ">Click to activate your account</a>" +
              "<p> Please note that this link will expire in 72 hours, if the link is expired, you need to register again</p>" // html body
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
