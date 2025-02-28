'use client';
import { RadioProps, useRadio } from '@heroui/radio';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import clsx from 'clsx';

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
