"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | ---
------------------------------------------------------- */
// node i nodemailer
// sendMail(to:string, subject:string, message:string):

const nodemailer = require('nodemailer')
require('dotenv').config();

module.exports = function (to, subject, message) {

    // Set Passive:
    // return true

    //? GoogleMail (gmail):
    // Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
    const mailSettings = {
        service: 'Gmail',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    };

    const transporter = nodemailer.createTransport({
        service: mailSettings.service,
        auth: {
            user: mailSettings.user,
            pass: mailSettings.pass,
        }
    });

    transporter.sendMail({
        from: mailSettings.user,
        to: to,
        subject: subject,
        text: message,
        html: message,
    }, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}