import React from 'react';
import { cva, cx, VariantProps } from 'class-variance-authority';

const inputCVA = cva('h-10', {
  variants: {
    state: {
      Default:
        'border border-primary-700 rounded-md   focus:border-2 focus:border-primary-900',
      ErrorState: '!border-myAccent-error-300 border-2 rounded outline-none',
    },

    direction: {
      ltr: 'text-left pl-8',
      rtl: 'text-right pr-8',
    },

    fullWidth: {
      true: 'w-full',
    },
  },
});

interface InputProps extends VariantProps<typeof inputCVA> {
  /**
   * Input Label
   */
  label?: string;

  /**
   * Default HTML input types
   */

  inputType: string;

  /**
   * fullwidth option
   */
  fullWidth: boolean;

  /**
   * name of the input
   */

  name: string;

  /**
   * the handle Change event
   */

  handleChange?: (value: string, name: string) => void;

  /**
   * disabled property
   */
  disabled?: boolean;

  /**
   * placeholder prop
   */
  placeholder?: string;
}

/**
 * Primary UI component for user interaction
 */
export const InputField = ({
  direction,
  fullWidth,
  state,
  label,
  inputType,
  placeholder,
  name,
  handleChange,
  disabled,
}: InputProps) => {
  return (
    <div className=" space-y-1">
      <label
        className={cx('capitalize block text-right', {
          'text-myAccent-error-500': state === 'ErrorState',
        })}
      >
        {label}
      </label>

      <input
        type={inputType}
        className={inputCVA({ state, fullWidth, direction })}
        onChange={(event) => {
          handleChange && handleChange(event.target.value, event.target.name);
        }}
        name={name}
        required
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};
