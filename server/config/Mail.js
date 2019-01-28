const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

async function sendMail() {
    let mailOptions = {
        from: '"Note Manager 👻" <'+process.env.MAIL+'>', // sender address
        to: "vehbi.iltan@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    };
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports.sendMail = sendMail;
