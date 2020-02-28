"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const verification_1 = require("../assets/verification");
const password_reset_1 = require("../assets/password_reset");
let transporter = nodemailer_1.default.createTransport({
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
        privateKey: fs_1.default.readFileSync(path_1.default.join(__dirname, "./certificates/ecolote.com.priv"), "utf8"),
        cacheDir: path_1.default.join(path_1.default.dirname(require.main.filename), "tmp"),
        cacheTreshold: 100 * 1024
    }
});
exports.verification_email = (userMail, username, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let logoPath = path_1.default.join(__dirname, "..", "assets", "images", "ecolote.png");
        let logoInstagram = path_1.default.join(__dirname, "..", "assets", "images", "instagram2x.png");
        let logoLinkedin = path_1.default.join(__dirname, "..", "assets", "images", "linkedin2x.png");
        let finalAttachments = [];
        let actualAttachments = [
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
        yield Promise.all(actualAttachments.map((i) => __awaiter(void 0, void 0, void 0, function* () {
            if (yield fs_1.default.existsSync(i.path)) {
                finalAttachments = [...finalAttachments, i];
            }
        })));
        let mail = yield transporter.sendMail({
            from: `Ecolote <${process.env.EMAIL_SUPPORT}>`,
            sender: "Ecolote",
            to: `${userMail}, ${process.env.EMAIL_SUPPORT}`,
            priority: "normal",
            replyTo: process.env.EMAIL_SUPPORT,
            subject: `${username} Verifica tu correo para que puedas ingresar a Ecolote`,
            html: verification_1.code_send_register_template(username, code, moment_1.default().format("dddd, M/YYYY"), moment_1.default().format("YYYY")),
            attachments: [...finalAttachments]
        });
        return Promise.resolve(true);
    }
    catch (error) {
        return Promise.reject(error);
    }
});
exports.password_reset_mail = (userMail, username, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let logoPath = path_1.default.join(__dirname, "..", "assets", "images", "ecolote.png");
        let logoInstagram = path_1.default.join(__dirname, "..", "assets", "images", "instagram2x.png");
        let logoLinkedin = path_1.default.join(__dirname, "..", "assets", "images", "linkedin2x.png");
        let finalAttachments = [];
        let actualAttachments = [
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
        yield Promise.all(actualAttachments.map((i) => __awaiter(void 0, void 0, void 0, function* () {
            if (yield fs_1.default.existsSync(i.path)) {
                finalAttachments = [...finalAttachments, i];
            }
        })));
        yield transporter.sendMail({
            from: `Ecolote <${process.env.EMAIL_SUPPORT}>`,
            sender: "Ecolote",
            to: userMail,
            subject: `Instrucciones para restablecer la contraseña de cuenta de Ecolote`,
            html: password_reset_1.password_reset_template(username, code, moment_1.default().format("YYYY")),
            attachments: [...finalAttachments]
        });
        return Promise.resolve(true);
    }
    catch (error) {
        return Promise.reject(error);
    }
});
//# sourceMappingURL=mailer.js.map