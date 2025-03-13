'use client';
import { RadioGroup } from '@heroui/radio';
import { RiFontMono, RiFontSans, RiFontSansSerif } from 'react-icons/ri';

import { useFont } from '../contexts/FontContext';

import { CustomRadio } from './CustomRadio';

/**
 * A component that allows users to switch between different font styles.
 * 
 * This component uses a radio group to present three font options: 'sans-serif', 'serif', and 'monospace'.
 * Each option is represented by a `CustomRadio` component with a corresponding icon and description.
 * 
 * @component
 * @example
 * <FontSwitch />
 * 
 * @returns {JSX.Element} The FontSwitch component.
 */
export default function FontSwitch(): JSX.Element {
  const { font, setFont } = useFont();

  const handleFontChange = (value: string) => {
    setFont(value as 'sans-serif' | 'serif' | 'monospace');
  };

  return (
    <RadioGroup value={font} onValueChange={handleFontChange}>
      <CustomRadio
        classNames={{
          label: 'flex items-center gap-2',
        }}
        description='Clean and modern, easy to read'
        value='sans-serif'
      >
        <span className='flex items-center gap-2'>
          <RiFontSans size={20} />
          Sans-Serif
        </span>
      </CustomRadio>
      <CustomRadio
        classNames={{
          label: 'flex items-center gap-2',
        }}
        description='Classic and elegant for a timeless feel'
        value='serif'
      >
        <span className='flex items-center gap-2'>
          <RiFontSansSerif size={20} />
          Serif
        </span>
      </CustomRadio>
      <CustomRadio
        classNames={{
          label: 'flex items-center gap-2',
        }}
        description='Code like, great for a technical vibe'
        value='monospace'
      >
        <span className='flex items-center gap-2'>
          <RiFontMono size={20} />
          Monospace
        </span>
      </CustomRadio>
    </RadioGroup>
  );
}
