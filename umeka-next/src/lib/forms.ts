/**
 * FORM VALIDATION & SUBMISSION
 * --------------------------------------------------------------------------
 * Client-side validation for all enquiry forms, plus a single submit
 * function. Submissions are POSTed as JSON to NEXT_PUBLIC_FORM_ENDPOINT
 * (Formspree, Web3Forms, Google Apps Script, or your own serverless
 * function). The receiving endpoint MUST validate again server-side and
 * apply rate limiting / spam protection — client validation is for UX only.
 *
 * With no endpoint configured the site runs in demo mode: submissions are
 * validated and acknowledged, and the visitor is offered a WhatsApp hand-off.
 */

export type FieldType = 'text' | 'email' | 'tel' | 'select' | 'textarea';

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  options?: string[];
  /** Grid span on wide screens */
  wide?: boolean;
  maxLength?: number;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalisePhone(value: string) {
  return value.replace(/[\s()-]/g, '');
}

export function validateField(field: FieldDef, raw: string): string | null {
  const value = raw.trim();
  if (field.required && !value) {
    return field.type === 'select' ? `Please choose ${field.label.toLowerCase()}.` : `Please enter ${field.label.toLowerCase()}.`;
  }
  if (!value) return null;
  if (field.type === 'email' && !EMAIL.test(value)) return 'Please enter a valid email address, e.g. name@company.com.';
  if (field.type === 'tel') {
    const digits = normalisePhone(value);
    const indian = /^(\+?91|0)?[6-9]\d{9}$/;
    const intl = /^\+?\d{8,15}$/;
    if (!indian.test(digits) && !intl.test(digits)) return 'Please enter a valid phone number, e.g. 98765 43210.';
  }
  if (field.maxLength && value.length > field.maxLength) return `Please keep this under ${field.maxLength} characters.`;
  if (field.type !== 'textarea' && field.type !== 'select' && value.length < 2) return `Please enter a valid ${field.label.toLowerCase()}.`;
  return null;
}

export function validateAll(fields: FieldDef[], data: Record<string, string>) {
  const errors: Record<string, string> = {};
  for (const f of fields) {
    const err = validateField(f, data[f.name] ?? '');
    if (err) errors[f.name] = err;
  }
  return errors;
}

export type SubmitResult = { ok: true; demo: boolean } | { ok: false; message: string };

export async function submitEnquiry(formType: string, data: Record<string, string>): Promise<SubmitResult> {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  const payload = {
    formType,
    ...data,
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    submittedAt: new Date().toISOString(),
  };

  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 900));
    if (process.env.NODE_ENV !== 'production') console.info('[Umeka] Demo-mode enquiry', payload);
    return { ok: true, demo: true };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { ok: true, demo: false };
  } catch {
    return {
      ok: false,
      message: 'We could not send your enquiry just now. Please check your connection and try again, or reach us directly by phone or WhatsApp.',
    };
  }
}
