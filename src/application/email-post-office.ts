export interface EmailPostOffice {
  sendEmail: (email: string) => void;
}