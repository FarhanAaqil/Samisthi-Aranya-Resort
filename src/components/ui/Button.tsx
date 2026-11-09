import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'soft' | 'light' | 'outlineLight';
type Size = 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-wine text-petal shadow-soft hover:bg-wine-deep',
  secondary: 'border border-wine/60 text-wine hover:border-wine hover:bg-wine/8',
  soft: 'bg-rose-soft text-wine-deep hover:bg-rose',
  light: 'bg-petal text-wine-deep hover:bg-rose-soft',
  outlineLight: 'text-petal ring-1 ring-petal/50 hover:bg-petal/12',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-[0.95rem]',
};

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  /** Opens in a new tab with the safe rel attributes. */
  external?: boolean;
}

/** Link styled as a button. Every call to action on the site is a link: tel, WhatsApp, anchor or map. */
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
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide whitespace-nowrap',
        'transition-colors duration-300 motion-reduce:transition-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
