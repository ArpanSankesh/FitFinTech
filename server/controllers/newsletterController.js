const nodemailer = require('nodemailer');

const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Configure the transporter with your credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS 
            }
        });

        const mailOptions = {
            from: `"FitFinTech" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Welcome to FitFinTech! 🚀',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                    <div style="background-color: #0D9488; padding: 40px 20px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">FitFinTech</h1>
                    </div>
                    <div style="padding: 30px; color: #334155; line-height: 1.6;">
                        <h2 style="color: #0F172A;">You're on the list!</h2>
                        <p>Thank you for subscribing. We're excited to help you level up your fitness and finance game.</p>
                        <p>Expect weekly insights on:</p>
                        <ul style="color: #0D9488; font-weight: bold;">
                            <li>Health & Performance</li>
                            <li>Wealth Management</li>
                            <li>Tech Innovations</li>
                        </ul>
                        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                        <p style="font-size: 12px; color: #94a3b8; text-align: center;">© 2026 FitFinTech.</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Subscription successful!" });

    } catch (error) {
        console.error("Nodemailer Error:", error);
        res.status(500).json({ success: false, message: "Email delivery failed." });
    }
};

module.exports = { subscribeNewsletter };