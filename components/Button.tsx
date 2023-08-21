import React from 'react';
import { cva , VariantProps } from 'class-variance-authority';



const button = cva(['rounded','font-bold'],{
  variants : {
    intent: {
      primary:[ "bg-primary-900", "text-white", "hover:bg-primary-700"],
      secondary: ["border" ,"border-primary-700" , "hover:bg-primary-700"],
      tertiary: ['hover:underline']
    }, 
    size: {
        small: 'text-sm px-2 py-[6px]',
        medium: 'text-base px-[10px] py-2',
        large: 'text-[18px] px-4 py-[12px] '
    }
  }, 
  defaultVariants : {
    intent: 'primary'
  }, 
  compoundVariants: [
    {
      intent: 'primary',
      size: 'large',
      className: 'hover:bg-pink-500'
    },

  ]
})

interface ButtonProps extends VariantProps <typeof button> {
  /**
   * Button contents
   */
  label: string;
  /**
   * ? The operation is still not done
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
 
  intent,
  size,
  label,
  ...props
}: ButtonProps) => {
 
  
  return (
    <button
      type="button"
      className={button({intent, size})}
      {...props}
    >
      {label}
    </button>
  );
}
