import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'gold' | 'light' | 'outlineLight';
type Size = 'md' | 'lg';

const variants: Record<Variant, string> = {
  /** Forest on the ivory canvas. */
  primary: 'bg-forest text-ivory hover:bg-forest-soft',
  /** Hairline outline on the ivory canvas. */
  secondary: 'border border-ink/30 text-ink hover:border-forest hover:bg-forest hover:text-ivory',
  /** The main call to action on dark surfaces. */
  gold: 'bg-gold-light text-forest-deep hover:bg-ivory',
  light: 'bg-ivory text-forest-deep hover:bg-gold-light',
  /** Hairline outline on dark surfaces. */
  outlineLight: 'border border-ivory/45 text-ivory hover:border-ivory hover:bg-ivory/10',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-6 text-[0.72rem]',
  lg: 'h-13 px-8 text-[0.75rem]',
};

export const buttonClasses = (variant: Variant = 'primary', size: Size = 'md') =>
  cn(
    'inline-flex items-center justify-center gap-2.5 font-medium tracking-[0.2em] whitespace-nowrap uppercase',
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
