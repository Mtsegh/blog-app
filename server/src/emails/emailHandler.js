import { resendClient, sender } from "../lib/resend.js"
import { createResetPasswordTemplate, createUserVerificationTemplate } from "./emailTemlate.js"


export const sendAuthEmail = async (email, name, clientURL) => {
    // console.log(typeof email, email);
    
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Verify Your Email",
        html: createUserVerificationTemplate(name, clientURL),
    });
    // console.log(clientURL);
    
    if (error) {
        console.error("Error sending email: ", error.message);
        throw new Error("Failed to send welcome email");
    }

    // console.log("Welcome Email sent successfully", data);
};

export const sendPasswordResetEmail = async (email, name, clientURL) => {
    // console.log(typeof email, email);
    
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Reset Password Request",
        html: createResetPasswordTemplate(name, clientURL),
    });
    // console.log(clientURL);
    
    if (error) {
        console.error("Error sending email: ", error.message);
        throw new Error("Failed to send welcome email");
    }

    // console.log("Welcome Email sent successfully", data);
};

export const sendEmailsToSubscribers = async (emails, blogCatch) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const sendPromises = emails.map(async (email, index) => {
        await delay(index * 500); // stagger each send

        try {
            const { data, error } = await resendClient.emails.send({
                from: `${sender.name} <${sender.email}>`,
                to: email,
                subject: `📰 New blog from your subscription: ${blog.title}`,
                html: createEmailTemplate(clientURL, blogCatch),
            });

            if (error) {
                console.error(`Error sending to ${email}:`, error);
                return { email, status: "failed", error: error.message };
            }

            // console.log(`✅ Sent to ${email}`);
            return { email, status: "sent", data };
        } catch (err) {
            console.error(`❌ Exception sending to ${email}:`, err.message);
            return { email, status: "failed", error: err.message };
        }
    });

    // Wait for all to complete, regardless of individual success/failure
    const results = await Promise.all(sendPromises);

    // console.log("📬 Email sending complete:", results);
    // console.log(results);
    
};
