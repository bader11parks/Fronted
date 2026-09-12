const SA_MOBILE = /^(?:\+966|00966|966|0)?5\d{8}$/;

export function isValidKsaPhone(raw: string): boolean {
  const compact = raw.replace(/[\s-]/g, "");
  return SA_MOBILE.test(compact);
}

export function isValidName(name: string): boolean {
  const cleaned = name.trim();
  return /^[\u0600-\u06FFa-zA-Z\s'.-]{2,40}$/.test(cleaned);
}
