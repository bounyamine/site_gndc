// // src/services/email.service.ts
// import nodemailer from 'nodemailer';

// class EmailService {
//   private transporter: nodemailer.Transporter;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: parseInt(process.env.SMTP_PORT || '587'),
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS
//       }
//     });
//   }

//   async sendEventReminder(email: string, eventTitle: string, eventDate: Date): Promise<void> {
//     const mailOptions = {
//       from: process.env.SMTP_FROM,
//       to: email,
//       subject: `Rappel: ${eventTitle}`,
//       html: `
//         <h2>Rappel pour l'événement ${eventTitle}</h2>
//         <p>N'oubliez pas que l'événement commence le ${eventDate.toLocaleString()}.</p>
//         <p>À bientôt!</p>
//       `
//     };

//     await this.transporter.sendMail(mailOptions);
//   }

//   async sendProjectUpdate(email: string, projectTitle: string, update: string): Promise<void> {
//     const mailOptions = {
//       from: process.env.SMTP_FROM,
//       to: email,
//       subject: `Mise à jour du projet: ${projectTitle}`,
//       html: `
//         <h2>Nouvelle mise à jour pour ${projectTitle}</h2>
//         <p>${update}</p>
//       `
//     };

//     await this.transporter.sendMail(mailOptions);
//   }

//   async sendNewsletterPost(subscribers: string[], post: { title: string, excerpt: string }): Promise<void> {
//     const mailOptions = {
//       from: process.env.SMTP_FROM,
//       bcc: subscribers,
//       subject: `Nouveau post: ${post.title}`,
//       html: `
//         <h2>${post.title}</h2>
//         <p>${post.excerpt}</p>
//         <a href="${process.env.WEBSITE_URL}/blog">Lire la suite</a>
//       `
//     };

//     await this.transporter.sendMail(mailOptions);
//   }
// }

// export default new EmailService();