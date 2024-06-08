import nodemailer from "nodemailer"

const EMAIL_USER="alexkarki2060@gmail.com"
const EMAIL_PASSWORD="fzrp pcsk snaq mxcl"

export const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        }
    })

    const info = await transporter.sendMail({
        from:EMAIL_USER,
        to: email,
        subject: subject,
        text: text
    })

    console.log("Message sent: %s", info.messageId);

}

// sendEmail("karkiaayus2003@gmail.com", "hello", "hello")