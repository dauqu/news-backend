const nodemailer = require("nodemailer");

//Function to send email
// async function sendEmail() {
//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "localhost",
//     port: 465,
//     secure: false, // use TLS
//     auth: {
//       user: "admin@localhost",
//       pass: "",
//     },
//     tls: {
//       // do not fail on invalid certs
//       rejectUnauthorized: false,
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: "admin@localhost", // sender address
//     to: "info@dauqu.com", // list of receivers
//     subject: "options.subject", // Subject line
//     text: "options.message", // plain text body
//   });

//   console.log("Message sent: %s", info.messageId);
// }

// sendEmail().catch(console.error);

// const transporter = nodemailer.createTransport({
//   port: 25, // Postfix uses port 25
//   host: "localhost",
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// let transporter = nodemailer.createTransport({
//     host: 'localhost',
//     port: 465,
//     secure: true,
//     proxy: 'http://66.94.121.32:3128'
// });

// var message = {
//   from: "info@example.com",
//   to: "info@dauqu.com",
//   subject: "Confirm Email",
//   text: "Please confirm your email",
//   html: "<p>Please confirm your email</p>",
// };

// transporter.sendMail(message, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log("Message sent: %s", info.messageId);
// });

async function sendEmail() {
  let transporter = nodemailer.createTransport({
    host: "localhost",
    port: 465,
    secure: true,
    proxy: "http://180.151.238.175:8085",
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Fred Foo 👻",
    to: "info@dauqu.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);
}

sendEmail().catch(console.error);
