"use server";

import { pool } from "../lib/db";
import nodemailer from "nodemailer";

export async function submitConsultation(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // 1. Lưu vào cơ sở dữ liệu
    await pool.query(
      `INSERT INTO consultations (name, phone, email, message) VALUES (?, ?, ?, ?)`,
      [name, phone, email, message]
    );

    // 2. Cấu hình gửi email (Sử dụng cấu hình từ .env hoặc tạo tài khoản test)
    let transporter;
    
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Dùng tài khoản test của Ethereal cho môi trường development/demo nếu chưa cấu hình
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Nội dung email gửi cho Admin
    const adminMailOptions = {
      from: `"Bất Động Sản CMS" <${process.env.SMTP_USER || "no-reply@bds.com"}>`,
      to: process.env.ADMIN_EMAIL || "admin@example.com", // Gửi cho admin
      subject: `Yêu cầu tư vấn mới từ ${name}`,
      text: `Bạn nhận được yêu cầu tư vấn mới:\n\nHọ và tên: ${name}\nSố điện thoại: ${phone}\nEmail: ${email}\nLời nhắn: ${message}\n`,
      html: `
        <h3>Yêu cầu tư vấn mới</h3>
        <p><strong>Họ và tên:</strong> ${name}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || "Không có"}</p>
        <p><strong>Lời nhắn:</strong> ${message}</p>
      `,
    };

    // Thực hiện gửi cho admin
    const info = await transporter.sendMail(adminMailOptions);
    console.log("Admin Message sent: %s", info.messageId);
    
    if (nodemailer.getTestMessageUrl(info)) {
      console.log("Admin Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    // Gửi email xác nhận cho Khách hàng (nếu họ có cung cấp email)
    if (email) {
      const guestMailOptions = {
        from: `"Bất Động Sản CMS" <${process.env.SMTP_USER || "no-reply@bds.com"}>`,
        to: email,
        subject: `Xác nhận yêu cầu tư vấn - Bất Động Sản CMS`,
        text: `Chào ${name},\n\nChúng tôi đã nhận được yêu cầu tư vấn của bạn. Đại diện phân phối của chúng tôi sẽ liên hệ lại với bạn qua số điện thoại ${phone} trong thời gian sớm nhất.\n\nXin cảm ơn!`,
        html: `
          <h3>Xin chào ${name},</h3>
          <p>Chúng tôi đã nhận được yêu cầu tư vấn của bạn.</p>
          <p>Đại diện phân phối của chúng tôi sẽ liên hệ lại với bạn qua số điện thoại <strong>${phone}</strong> trong thời gian sớm nhất.</p>
          <br/>
          <p>Trân trọng,</p>
          <p><strong>Đội ngũ Bất Động Sản CMS</strong></p>
        `,
      };

      const guestInfo = await transporter.sendMail(guestMailOptions);
      console.log("Guest Message sent: %s", guestInfo.messageId);
      if (nodemailer.getTestMessageUrl(guestInfo)) {
        console.log("Guest Preview URL: %s", nodemailer.getTestMessageUrl(guestInfo));
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Lỗi gửi yêu cầu tư vấn:", error);
    return { success: false, error: "Có lỗi xảy ra." };
  }
}
