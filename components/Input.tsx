import React from "react";
import { cva, cx, VariantProps } from "class-variance-authority";
import { BiSolidDashboard } from "react-icons/bi";

const inputCVA = cva(
  "border border-primary-700 rounded-md h-10 focus:border-primary-900 focus:border-2 focsu",
  {
    variants: {
      // state: {
      //   /** In Design System there are 4 States, due the nature of Figma but in implemenation we have 2 */
      //   // ErrorState: [],
      // },

      hasIcon: {
        true: "absolute right-2 bottom-3 ",
      },

      fullWidth: {
        true: "w-96",
      },
    },
  }
);

interface InputProps extends VariantProps<typeof inputCVA> {
  /**
   * Input Label
   */
  // label: string;
  /**
   * Assitive Text is only to show errors
   */
  // Error? : object
  /**
   * There are 3 state that can be rendered to UI 1-Default 2-Focused 3-Error
   */
  // inputState: string;
  hasIcon: boolean;
  fullWidth: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const InputField = ({ fullWidth, hasIcon }: InputProps) => {
  return (
    <div className="relative">
      <p>Label</p>

      {hasIcon && (
        <BiSolidDashboard size={16} className={"absolute right-2 bottom-3"} />
      )}
      <input type="text" className={inputCVA({ fullWidth })}></input>
    </div>
  );
};
