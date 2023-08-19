import React from 'react';
// import './button.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  // primary?: boolean;
  /**
   * Secondary button to deemphasize on elements that are not primary level important
   */
    // secondary?: boolean;
    /**
     * Tertiary is used for the least important elements on the page
     */
    // tertiary?: boolean
    /**
     * Hover State
     */
    //?  hover: boolean
 
  /**
   * tailwind classes are the specific classes related to every specific story 
   * e.g. Large primary will add primary color plus the large size amount to the button 
   */
  tailwindClasses: string;

  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  
  tailwindClasses,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${tailwindClasses}`}
      {...props}
    >
      {label}
    </button>
  );
}
