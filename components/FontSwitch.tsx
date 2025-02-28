'use client';
import { RadioGroup } from '@heroui/radio';
import { RiFontMono, RiFontSans, RiFontSansSerif } from 'react-icons/ri';

import { useFont } from '../contexts/FontContext';

import { CustomRadio } from './CustomRadio';

export default function FontSwitch() {
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
