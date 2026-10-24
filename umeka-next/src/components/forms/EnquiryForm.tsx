'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { submitEnquiry, validateAll, validateField, type FieldDef } from '@/lib/forms';
import { track } from '@/lib/analytics';
import { whatsappLink } from '@/content/site';
import { Icon } from '@/components/ui/Icon';

type Props = {
  formType: 'general' | 'product' | 'dealer';
  fields: FieldDef[];
  defaults?: Record<string, string>;
  submitLabel?: string;
  tone?: 'light' | 'dark';
  successTitle?: string;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function EnquiryForm({ formType, fields, defaults = {}, submitLabel = 'Send Enquiry', tone = 'light', successTitle = 'Thank you — your enquiry has been received.' }: Props) {
  const uid = useId();
  const initial = Object.fromEntries(fields.map((f) => [f.name, defaults[f.name] ?? '']));
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const [demo, setDemo] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const dark = tone === 'dark';

  const setValue = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      const f = fields.find((x) => x.name === name)!;
      setErrors((e) => {
        const next = { ...e };
        const err = validateField(f, value);
        if (err) next[name] = err;
        else delete next[name];
        return next;
      });
    }
  };

  const onBlur = (f: FieldDef) => {
    setTouched((t) => ({ ...t, [f.name]: true }));
    const err = validateField(f, values[f.name] ?? '');
    setErrors((e) => {
      const next = { ...e };
      if (err) next[f.name] = err;
      else delete next[f.name];
      return next;
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = (e.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value;
    const found = validateAll(fields, values);
    setErrors(found);
    setTouched(Object.fromEntries(fields.map((f) => [f.name, true])));
    if (Object.keys(found).length) {
      const first = fields.find((f) => found[f.name]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
      return;
    }
    if (honeypot) {
      setStatus('success');
      return;
    }
    setStatus('submitting');
    setServerError('');
    const result = await submitEnquiry(formType, values);
    if (result.ok) {
      setDemo(result.demo);
      setStatus('success');
      track('generate_lead', { form_type: formType });
      requestAnimationFrame(() => successRef.current?.focus());
    } else {
      setStatus('error');
      setServerError(result.message);
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setTouched({});
    setStatus('idle');
  };

  const waSummary = () => {
    const lines = fields.filter((f) => values[f.name]).map((f) => `${f.label}: ${values[f.name]}`);
    return whatsappLink(`Hello Umeka, I have just sent an enquiry on your website.\n\n${lines.join('\n')}`);
  };

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={`rounded-sm p-8 outline-none lg:p-10 ${dark ? 'bg-forest-800 text-bone' : 'border border-moss/30 bg-moss-200/30'}`}
      >
        <span className={`flex h-14 w-14 items-center justify-center rounded-full ${dark ? 'bg-honey text-forest-950' : 'bg-forest text-bone'}`}>
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3 className={`text-display-sm mt-6 ${dark ? '!text-bone' : ''}`}>{successTitle}</h3>
        <p className={`mt-3 leading-relaxed ${dark ? 'text-bone/75' : 'text-stone'}`}>
          {values.name ? `Thank you, ${values.name.split(' ')[0]}. ` : ''}Our team will review your details and get back to you shortly. For anything urgent, you can also reach us directly on WhatsApp.
        </p>
        {demo && (
          <p className={`mt-4 rounded-sm border border-dashed p-3 text-xs ${dark ? 'border-bone/25 text-bone/60' : 'border-honey-ink/40 text-honey-ink'}`}>
            Preview mode: no form endpoint is configured yet, so this enquiry was validated but not delivered. Set NEXT_PUBLIC_FORM_ENDPOINT to go live.
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waSummary()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 bg-[#1f7a4d] px-6 text-sm font-medium text-white transition-colors hover:bg-[#186640]"
          >
            <Icon name="whatsapp" className="h-5 w-5" /> Continue on WhatsApp
          </a>
          <button
            type="button"
            onClick={reset}
            className={`inline-flex min-h-12 items-center px-6 text-sm font-medium underline-offset-4 hover:underline ${dark ? 'text-bone' : 'text-forest'}`}
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const labelCls = `mb-2 block text-[0.85rem] font-medium ${dark ? 'text-bone/85' : 'text-charcoal'}`;
  const inputCls = (invalid: boolean) =>
    `block w-full rounded-sm border px-4 text-[0.98rem] transition-colors duration-200 placeholder:text-stone-light/80 focus:outline-none focus:ring-2 ${
      dark
        ? `bg-forest-900/60 text-bone ${invalid ? 'border-[#f0a08f] focus:ring-[#f0a08f]/40' : 'border-bone/20 focus:border-honey-light focus:ring-honey-light/25'}`
        : `bg-paper text-charcoal ${invalid ? 'border-danger focus:ring-danger/20' : 'border-sand focus:border-forest focus:ring-forest/15'}`
    }`;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-req`} className="relative">
      <p id={`${uid}-req`} className={`mb-6 text-xs ${dark ? 'text-bone/55' : 'text-stone-light'}`}>
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {status !== 'submitting' && errorCount > 0 && Object.keys(touched).length === fields.length && (
        <div role="alert" className={`mb-6 flex gap-3 rounded-sm border p-4 text-sm ${dark ? 'border-[#f0a08f]/50 text-[#ffd2c8]' : 'border-danger/30 bg-danger/5 text-danger'}`}>
          <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0" />
          Please correct {errorCount === 1 ? 'the highlighted field' : `the ${errorCount} highlighted fields`} and try again.
        </div>
      )}

      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `${uid}-${f.name}`;
          const err = touched[f.name] ? errors[f.name] : undefined;
          const describedBy = err ? `${id}-err` : undefined;
          return (
            <div key={f.name} className={f.wide || f.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <label htmlFor={id} className={labelCls}>
                {f.label}
                {f.required && <span aria-hidden="true" className="ml-0.5 text-honey-ink">*</span>}
                {!f.required && <span className={`ml-1.5 text-xs font-normal ${dark ? 'text-bone/45' : 'text-stone-light'}`}>(optional)</span>}
              </label>
              {f.type === 'select' ? (
                <div className="relative">
                  <select
                    id={id}
                    name={f.name}
                    value={values[f.name]}
                    required={f.required}
                    aria-invalid={!!err}
                    aria-describedby={describedBy}
                    onChange={(e) => setValue(f.name, e.target.value)}
                    onBlur={() => onBlur(f)}
                    className={`${inputCls(!!err)} min-h-[3.25rem] appearance-none pr-10`}
                  >
                    <option value="">Select {f.label.toLowerCase()}</option>
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevron" className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 ${dark ? 'text-bone/60' : 'text-stone'}`} />
                </div>
              ) : f.type === 'textarea' ? (
                <textarea
                  id={id}
                  name={f.name}
                  rows={4}
                  value={values[f.name]}
                  placeholder={f.placeholder}
                  required={f.required}
                  maxLength={f.maxLength}
                  aria-invalid={!!err}
                  aria-describedby={describedBy}
                  onChange={(e) => setValue(f.name, e.target.value)}
                  onBlur={() => onBlur(f)}
                  className={`${inputCls(!!err)} resize-y py-3.5`}
                />
              ) : (
                <input
                  id={id}
                  name={f.name}
                  type={f.type}
                  inputMode={f.type === 'tel' ? 'tel' : f.type === 'email' ? 'email' : undefined}
                  autoComplete={f.autoComplete}
                  value={values[f.name]}
                  placeholder={f.placeholder}
                  required={f.required}
                  maxLength={f.maxLength ?? 120}
                  aria-invalid={!!err}
                  aria-describedby={describedBy}
                  onChange={(e) => setValue(f.name, e.target.value)}
                  onBlur={() => onBlur(f)}
                  className={`${inputCls(!!err)} min-h-[3.25rem]`}
                />
              )}
              {err && (
                <p id={`${id}-err`} className={`mt-2 flex items-start gap-1.5 text-[0.82rem] ${dark ? 'text-[#ffbfb1]' : 'text-danger'}`}>
                  <span aria-hidden="true">!</span> {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Honeypot (hidden from people, tempting for bots) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <div role="alert" className={`mt-6 flex gap-3 rounded-sm border p-4 text-sm ${dark ? 'border-[#f0a08f]/50 text-[#ffd2c8]' : 'border-danger/30 bg-danger/5 text-danger'}`}>
          <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {serverError}{' '}
            <a href={waSummary()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              Send via WhatsApp
            </a>
          </span>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className={`max-w-sm text-xs leading-relaxed ${dark ? 'text-bone/55' : 'text-stone-light'}`}>
          By submitting, you agree that Umeka may contact you about your enquiry. See our{' '}
          <a href="/privacy-policy/" className="underline underline-offset-2">Privacy Policy</a>.
        </p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
          className={`group inline-flex min-h-14 items-center justify-center gap-3 px-9 font-medium tracking-wide transition-all duration-300 disabled:cursor-wait disabled:opacity-75 ${
            dark ? 'bg-honey text-forest-950 hover:bg-honey-light' : 'bg-forest text-bone hover:bg-forest-800'
          }`}
        >
          {status === 'submitting' ? (
            <>
              <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
              Sending…
            </>
          ) : (
            <>
              {submitLabel}
              <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
