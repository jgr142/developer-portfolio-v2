import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	// Create a transporter object using the default SMTP transport
	// TODO: Replace with email service provider credentials
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'fake@ethereal.email',
			pass: 'passfake'
		}
	});

	const mailOptions = {
		from: 'contact-form@jg.com', // TODO: Replace with special email for this page
		to: 'jg121@rice.edu', // FIXME: Magic string
		subject: `New message from your portfolio: ${body.name}`,
		text: `Name: ${body.name}\n\nMessage:\n${body.message}`,
	};

	try {
		await transporter.sendMail(mailOptions);
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: 'Failed to send email' };
	}
});
