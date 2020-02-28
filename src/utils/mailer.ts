import mailer from "nodemailer";
import path from "path";
import fs from "fs";
import moment from "moment";

import { code_send_register_template } from "../assets/verification";
import { password_reset_template } from "../assets/password_reset";

interface finalAttachmentsType {
  filename: string;
  path: string;
  cid: string;
}

let transporter = mailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SUPPORT,
    pass: process.env.PASSWORD_EMAIL_SUPPORT
  },
  dkim: {
    domainName: "ecolote.com",
    keySelector: "default",
    privateKey: fs.readFileSync(
      path.join(__dirname, "./certificates/ecolote.com.priv"),
      "utf8"
    ),
    cacheDir: path.join(path.dirname(require.main.filename), "tmp"),
    cacheTreshold: 100 * 1024
  }
});

export const verification_email = async (
  userMail: string,
  username: string,
  code: string
) => {
  try {
    let logoPath = path.join(
      __dirname,
      "..",
      "assets",
      "images",
      "ecolote.png"
    );
    let logoInstagram = path.join(
      __dirname,
      "..",
      "assets",
      "images",
      "instagram2x.png"
    );
    let logoLinkedin = path.join(
      __dirname,
      "..",
      "assets",
      "images",
      "linkedin2x.png"
    );

    let finalAttachments: finalAttachmentsType[] = [];

    let actualAttachments: finalAttachmentsType[] = [
      {
        filename: "ecolote.png",
        path: logoPath,
        cid: "logo"
      },
      {
        filename: "instagram2x.png",
        path: logoInstagram,
        cid: "instagram"
      },
      {
        filename: "linkedin2x.png",
        path: logoLinkedin,
        cid: "linkedin"
      }
    ];

    await Promise.all(
      actualAttachments.map(async i => {
        if (await fs.existsSync(i.path)) {
          finalAttachments = [...finalAttachments, i];
        }
      })
    );

    let mail = await transporter.sendMail({
      from: `Ecolote <${process.env.EMAIL_SUPPORT}>`,
      sender: "Ecolote",
      to: `${userMail}, ${process.env.EMAIL_SUPPORT}`,
      priority: "normal",
      replyTo: process.env.EMAIL_SUPPORT,

      subject: `${username} Verifica tu correo para que puedas ingresar a Ecolote`,
      html: code_send_register_template(
        username,
        code,
        moment().format("dddd, M/YYYY"),
        moment().format("YYYY")
      ),
      attachments: [...finalAttachments]
    });

    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const password_reset_mail = async (
  userMail: string,
  username: string,
  code: string
) => {
  try {
    let logoPath = path.join(
      __dirname,
      "..",
      "assets",
      "images",
      "ecolote.png"
    );
    let logoInstagram = path.join(
      __dirname,
      "..",
      "assets",
      "images",
      "instagram2x.png"
    );
    let logoLinkedin = path.join(
      __dirname,
      "..",
      "assets",
      "images",
      "linkedin2x.png"
    );

    let finalAttachments: finalAttachmentsType[] = [];

    let actualAttachments: finalAttachmentsType[] = [
      {
        filename: "ecolote.png",
        path: logoPath,
        cid: "logo"
      },
      {
        filename: "instagram2x.png",
        path: logoInstagram,
        cid: "instagram"
      },
      {
        filename: "linkedin2x.png",
        path: logoLinkedin,
        cid: "linkedin"
      }
    ];

    await Promise.all(
      actualAttachments.map(async i => {
        if (await fs.existsSync(i.path)) {
          finalAttachments = [...finalAttachments, i];
        }
      })
    );

    await transporter.sendMail({
      from: `Ecolote <${process.env.EMAIL_SUPPORT}>`,
      sender: "Ecolote",
      to: userMail,
      subject: `Instrucciones para restablecer la contraseña de cuenta de Ecolote`,
      html: password_reset_template(username, code, moment().format("YYYY")),
      attachments: [...finalAttachments]
    });

    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};
