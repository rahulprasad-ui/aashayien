import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-6 py-2.5',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded-xl px-8 py-3 text-base',
        sm: 'h-9 rounded-lg px-4 text-xs',
      },
      variant: {
        default: 'bg-[#ED1F24] text-white font-bold hover:bg-[#d11b20] rounded-xl shadow-md shadow-[#ED1F24]/20 transition-all hover:scale-102 active:scale-95',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl',
        ghost: 'hover:bg-card hover:text-accent-foreground rounded-xl',
        link: 'text-[#ED1F24] font-bold items-start justify-start hover:underline',
        outline: 'border-2 border-[#ED1F24] text-[#ED1F24] font-bold bg-background hover:bg-[#ED1F24] hover:text-white rounded-xl transition-all',
        secondary: 'bg-[#f59e0b] text-white font-bold hover:bg-[#d97706] rounded-xl shadow-md transition-all',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
