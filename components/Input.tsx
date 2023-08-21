import React from "react";
import { cva, cx, VariantProps } from "class-variance-authority";

const inputCVA = cva("border border-primary-700 rounded-md pl-2 h-10 ", {
  variants: {
    state: {
      /** In Design System there are 4 States, due the nature of Figma but in implemenation we have 2 */
      FocusState: " border-primary-900 border-2 text-myAccent-error-500",
      ErrorState: "border-myAccent-error-300 border-2",
    },

    fullWidth: {
      true: "w-full",
    },
  },
});

interface InputProps extends VariantProps<typeof inputCVA> {
  /**
   * Input Label
   */
  label: string;

  /**
   * input type 
   */

  inputType : string

  /**
   * fullwidth option
   */
  fullWidth: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const InputField = ({ fullWidth,  state, label , inputType }: InputProps) => {
  return (
    <div className="relative">
      <p
        className={cx('capitalize',{
          "text-myAccent-error-500": state === "ErrorState",
        })}
      >
        {label}
      </p>

      <input type={inputType} className={inputCVA({ state, fullWidth })}></input>
    </div>
  );
};
