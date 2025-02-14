const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail as the email service
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email address
    pass: process.env.EMAIL_PASS, // Your Gmail app password
  },
});

/**
 * Send an email using Nodemailer.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email.
 * @param {string} html - The HTML content of the email (optional).
 * @returns {Promise} - A promise that resolves when the email is sent.
 */
const sendMail = async (to, subject, text, html = '') => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to, // Recipient email address
      subject, // Email subject
      text, // Plain text body
      html, // HTML body (optional)
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendMail;










//USE------------------>

// const sendMail = require('./config/mailSender');

// // Example: Send a plain text email
// sendMail('recipient@example.com', 'Test Email', 'This is a test email from Nodemailer.')
//   .then(() => console.log('Email sent successfully!'))
//   .catch((error) => console.error('Failed to send email:', error));


// // Example: Send an HTML email
// const htmlContent = `
//   <h1>Welcome to Our Platform!</h1>
//   <p>Thank you for signing up. We are excited to have you on board.</p>
// `;

// sendMail('recipient@example.com', 'Welcome Email', '', htmlContent)
//   .then(() => console.log('HTML email sent successfully!'))
//   .catch((error) => console.error('Failed to send HTML email:', error));