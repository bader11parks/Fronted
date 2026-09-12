export function isValidEmail(value: string): boolean {
  const email = value.trim().toLowerCase();
  return email.length > 0 && email.length <= 254 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}
