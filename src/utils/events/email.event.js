import { EventEmitter } from "node:events";
import sendEmail from "../email/send.email.js";
import { userModel } from "../../db/models/user.model.js";
import resetPasswordTemplate from "../email/templates/resetPassword.template.js";
import generateOTP from "../../utils/email/generateOTP.js";
import * as dbService from "../../db/db.service.js";

export const emailEvent = new EventEmitter();

export const emailSubject = {
  resetPassword: "Reset password",
};

export const sendOTP = async ({ data, subject, template } = {}) => {
  const { id, email } = data;

  const { hashedOTP, OTP } = generateOTP();

  await dbService.findByIdAndUpdate({
    model: userModel,
    id,
    data: { resetPasswordOTP: hashedOTP },
  });

  const html = template({ OTP });

  await sendEmail({ to: email, subject, html });
};

emailEvent.on("resetPassword", async (data) => {
  await sendOTP({
    data,
    subject: emailSubject.resetPassword,
    template: resetPasswordTemplate,
  });
});
