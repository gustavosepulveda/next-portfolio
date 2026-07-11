"use server";

import { Resend } from "resend";

const validateString = (value: unknown, maxLength: number) => {
  return typeof value === "string" && value.length > 0 && value.length <= maxLength;
};

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }

  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      error: "Email service is not configured. Please email me directly.",
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "gustavosepulveda@ymail.com",
      subject: "Message from portfolio contact form",
      replyTo: senderEmail as string,
      text: message as string,
    });

    if (error) {
      return {
        error: typeof error === "object" && "message" in error
          ? (error as { message: string }).message
          : "Something went wrong",
      };
    }

    return {
      data,
    };
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
