const nodemailer = require('nodemailer');
// const nodemailerConst = require('../constants/constant.js');

module.exports={
    mailer: (result,mails,subject,body,title)=>{
        //Handling Mailer
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });
        mails.map((item,id)=>{
            let mailOptions = {
                from: process.env.NODEMAILER_USER, // sender address
                to: item, // list of receivers
                subject: subject[id], // Subject line
                text: body[id], // plain text body
                html:   `<h2>${title}</h2>
                    <table style="border: 1px solid; border-collapse: collapse">
                        <tr style="border: 1px solid">
                            <th style="border: 1px solid">Complain ID</th>
                            <td style="border: 1px solid">${result._id}</td>
                        </tr>
                        <tr style="border: 1px solid">
                            <th style="border: 1px solid">Department</th>
                            <td style="border: 1px solid">${result.department}</td>
                        </tr>
                        <tr style="border: 1px solid">
                            <th style="border: 1px solid">Title</th>
                            <td style="border: 1px solid">${result.title}</td>
                        </tr>
                        <tr style="border: 1px solid">
                            <th style="border: 1px solid">Body</th>
                            <td style="border: 1px solid">${result.body}</td>
                        </tr>
                        ${
                            (id===0) ?
                            `<tr style="border: 1px solid">
                                <th style="border: 1px solid">Assigned To</th>
                                <td style="border: 1px solid">${result.assigned_to}</td>
                                </tr>
                                <tr style="border: 1px solid">
                                <th style="border: 1px solid">Assigned Person Email</th>
                                <td style="border: 1px solid">${result.assigned_email}</td>
                            </tr>`
                            : 
                            `<tr style="border: 1px solid">
                                <th style="border: 1px solid">Lodge By</th>
                                <td style="border: 1px solid">${result.username}</td>
                            </tr>
                            <tr style="border: 1px solid">
                                <th style="border: 1px solid">Person Email</th>
                                <td style="border: 1px solid">${result.email_id}</td>
                            </tr>`
                        }
                    </table> 
                <h3>Want to know more<a href="http://localhost:3000">click here</a> to check</h3>` // html body
            };
            transporter.sendMail(mailOptions);
        })

    }
}