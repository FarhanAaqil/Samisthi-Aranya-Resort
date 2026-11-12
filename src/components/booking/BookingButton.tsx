'use client';

import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

import { useBooking } from './BookingProvider';

interface BookingButtonProps {
  room?: string;
  variant?: Parameters<typeof buttonClasses>[0];
  size?: Parameters<typeof buttonClasses>[1];
  className?: string;
  children: React.ReactNode;
}

/** A button that opens the availability dialog. Safe to drop into server components. */
export function BookingButton({
  room,
  variant = 'primary',
  size,
  className,
  children,
}: BookingButtonProps) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      onClick={() => openBooking(room)}
      className={cn(buttonClasses(variant, size), className)}
    >
      {children}
    </button>
  );
}
