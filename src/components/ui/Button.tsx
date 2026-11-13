import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary';
type Size = 'md' | 'lg';

const variants: Record<Variant, string> = {
  /** Solid brass: the main call to action. */
  primary: 'bg-brass text-bark hover:bg-brass-light',
  /** Hairline cream outline. */
  secondary: 'border border-cream/45 text-cream hover:border-brass hover:text-brass-light',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-6 text-[0.68rem]',
  lg: 'h-13 px-8 text-[0.7rem]',
};

export const buttonClasses = (variant: Variant = 'primary', size: Size = 'md') =>
  cn(
    'inline-flex items-center justify-center gap-2.5 font-medium tracking-[0.28em] whitespace-nowrap uppercase',
    'transition-colors duration-300 motion-reduce:transition-none',
    variants[variant],
    sizes[size],
  );

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  /** Opens in a new tab with the safe rel attributes. */
  external?: boolean;
}

/** Link styled as a button. Calls to action are links: tel, WhatsApp, anchor or map. */
export function Button({
  variant = 'primary',
  size = 'md',
  external,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      className={cn(buttonClasses(variant, size), className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
