/* Shared by the contact form (client) and the API route (server). */

export type ContactInput = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalise(input: Partial<Record<keyof ContactInput, unknown>>): ContactInput {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return { name: str(input.name), email: str(input.email), message: str(input.message) };
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (!input.name) errors.name = "Please enter your name.";
  else if (input.name.length < LIMITS.name.min) errors.name = `Name must be at least ${LIMITS.name.min} characters.`;
  else if (input.name.length > LIMITS.name.max) errors.name = `Name must be ${LIMITS.name.max} characters or fewer.`;

  if (!input.email) errors.email = "Please enter your email address.";
  else if (input.email.length > LIMITS.email.max || !EMAIL_RE.test(input.email))
    errors.email = "Please enter a valid email address, like name@example.com.";

  if (!input.message) errors.message = "Please write a message.";
  else if (input.message.length < LIMITS.message.min)
    errors.message = `Message must be at least ${LIMITS.message.min} characters.`;
  else if (input.message.length > LIMITS.message.max)
    errors.message = `Message must be ${LIMITS.message.max} characters or fewer.`;

  return errors;
}
