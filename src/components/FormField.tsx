import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  className?: string;
  as?: 'input' | 'textarea';
  hint?: ReactNode;
  rows?: number;
}

export default function FormField({ id, label, error, className, as = 'input', hint, rows = 5, ...props }: Props) {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
  const common = {
    id,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy,
    className: cn('input', error && 'input-error'),
  };
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {props.required && (
          <span className="text-accent" aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>
      {as === 'textarea' ? (
        <textarea {...common} rows={rows} {...(props as unknown as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input {...common} {...props} />
      )}
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
