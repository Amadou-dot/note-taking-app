'use client';
import { RadioProps, useRadio } from '@heroui/radio';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import clsx from 'clsx';

/**
 * CustomRadio component that renders a custom radio button with additional styling and functionality.
 *
 * @param {RadioProps} props - The properties passed to the CustomRadio component.
 * @returns {JSX.Element} The rendered CustomRadio component.
 *
 * @component
 * @example
 * ```tsx
 * <CustomRadio
 *   Component="div"
 *   description="This is a custom radio button"
 *   {...otherProps}
 * >
 *   Label Text
 * </CustomRadio>
 * ```
 *
 * @remarks
 * This component uses the `useRadio` hook to manage the radio button's state and properties.
 * It also utilizes the `clsx` library for conditional class names and `VisuallyHidden` for accessibility.
 *
 * @param {React.ElementType} Component - The component to render as the base element.
 * @param {React.ReactNode} children - The content to be displayed as the label of the radio button.
 * @param {string} description - The description text to be displayed below the label.
 * @param {Function} getBaseProps - Function to get the base properties for the component.
 * @param {Function} getWrapperProps - Function to get the properties for the wrapper element.
 * @param {Function} getInputProps - Function to get the properties for the input element.
 * @param {Function} getLabelProps - Function to get the properties for the label element.
 * @param {Function} getLabelWrapperProps - Function to get the properties for the label wrapper element.
 * @param {Function} getControlProps - Function to get the properties for the control element.
 */
export const CustomRadio = (props: RadioProps) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={clsx(
        'group inline-flex flex-row-reverse items-center justify-between tap-highlight-transparent hover:opacity-70 active:opacity-50',
        'cursor-pointer gap-4 rounded-lg border-2 border-default p-4',
        'data-[selected=true]:border-primary',
        'max-w-[800px]'
      )}
      
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className='text-small text-foreground opacity-70'>
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};
