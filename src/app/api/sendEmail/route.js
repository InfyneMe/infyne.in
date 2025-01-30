import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const body = await req.json();
        const { data } = body;
        // Create a transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // replace with your email
                pass: process.env.EMAIL_PASS, // replace with your email password
            },
        });

        // Email options
        let mailOptions = {
            from: 'bishaldeb8403@gmail.com', // replace with your email
            to: 'infynetech@gmail.com', // replace with your email
            subject: 'New Project Consultation Request',
            text: `Full Name: ${data.fullName}\nEmail: ${data.workEmail}\nCompany: ${data.company}\nProject Details: ${data.projectDetails}`,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}