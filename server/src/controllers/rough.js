// export const getBlogs = async (req, res) => {
//     try {
//         const limit = parseInt(req.query.limit) || 10;
//         const skip = parseInt(req.query.skip) || 0;

//         const { author, topics } = req.query;
//         const filter = { published: true };

//         if (author) filter.authorId = author;
//         if (topics) filter.topics = topics.toLowerCase();

//         if (!author && !topics) {
//             return res.status(400).json({ message: "Provide either author or topics" });
//         }

//         const blogs = await Blog.find(filter)
//             .sort({ createdAt: -1 })
//             .select("-htmlContent -tags -blogPics")
//             .skip(skip)
//             .limit(limit);

//         if (blogs.length === 0) {
//             return res.status(404).json({ message: "No blogs found" });
//         }

//         res.status(200).json({ count: blogs.length, skip, limit, blogs });
//     } catch (error) {
//         console.error("Error in getBlogs controller:", error.message);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from '@sendgrid/mail'

sgMail.setApiKey('')
// sgMail.setDataResidency('eu'); 
// uncomment the above line if you are sending mail using a regional EU subuser

const msg = {
  to: 'yaronpapi294@gmail.com', // Change to your recipient
  from: 'gettystories@outlook.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })