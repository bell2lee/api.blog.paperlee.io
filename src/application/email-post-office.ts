export type Email = `${string}@${string}.${string}` | string;

export interface EmailPostOffice {
  sendEmail: (message: {
    to: Email;
    subject: string;
    content: string;
    from: Email;
  }) => Promise<void>;
}
