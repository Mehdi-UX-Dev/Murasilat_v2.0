import React from "react";
import { cva, cx, VariantProps } from "class-variance-authority";
import { useCredentialsContext } from "../../hooks/credentialsContext";

const inputCVA = cva(
  "border border-primary-700 rounded-md pl-2 h-10 focus:border-2 focus:border-primary-900 ",
  {
    variants: {
      state: {
        /** In Design System there are 4 States, due the nature of Figma but in implemenation we have 2 */
        /** The Default state is empty cuz we want to override the error state when it is cleared */
        Default: "",
        ErrorState: "!border-myAccent-error-300 border-2",
      },

      fullWidth: {
        true: "w-full",
      },
    },
  }
);

interface InputProps extends VariantProps<typeof inputCVA> {
  /**
   * Input Label
   */
  label: string;

  /**
   * Default HTML input types
   */

  inputType: string;

  /**
   * fullwidth option
   */
  fullWidth: boolean;

  /**
   * Language Support
   */
  lang?: "RTL" | "LTR";
}

/**
 * Primary UI component for user interaction
 */
export const InputField = ({
  fullWidth,
  state,
  label,
  inputType,
  lang,
}: InputProps) => {
  const consumeCredentials = useCredentialsContext();

  /**
   * handleChange gives the value of input to the credentials context
   */

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    consumeCredentials?.setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="relative">
      <p
        className={cx("capitalize", {
          "text-myAccent-error-500": state === "ErrorState",
        })}
      >
        {label}
      </p>

      <input
        type={inputType}
        className={inputCVA({ state, fullWidth })}
        onChange={handleChange}
        name={label?.toLowerCase()}
        required
      />
    </div>
  );
};
