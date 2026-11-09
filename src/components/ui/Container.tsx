import { cn } from '@/lib/cn';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Narrower measure for reading-heavy blocks such as the FAQ. */
  size?: 'default' | 'narrow';
}

export function Container({ size = 'default', className, ...rest }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-10',
        size === 'narrow' ? 'max-w-3xl' : 'max-w-[1200px]',
        className,
      )}
      {...rest}
    />
  );
}
