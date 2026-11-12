import { cn } from '@/lib/cn';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `narrow` for reading-heavy blocks such as the FAQ, `wide` for full photo layouts. */
  size?: 'default' | 'narrow' | 'wide';
}

const widths = {
  default: 'max-w-[1240px]',
  narrow: 'max-w-3xl',
  wide: 'max-w-[1440px]',
};

export function Container({ size = 'default', className, ...rest }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', widths[size], className)}
      {...rest}
    />
  );
}
