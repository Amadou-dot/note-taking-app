'use client';
import { Radio, RadioGroup } from '@heroui/radio';

import { useFont } from '../contexts/FontContext';

export default function FontSwitch() {
  const { font, setFont } = useFont();

  const handleFontChange = (value: string) => {
    setFont(value as 'sans-serif' | 'serif' | 'monospace');
  };

  return (
    <RadioGroup value={font} onChange={handleFontChange}>
      <Radio description='Clean and modern, easy to read' value='sans-serif'>
        Sans-Serif
      </Radio>
      <Radio
        description='Classic and elegant for a timeless feel'
        value='serif'
      >
        Serif
      </Radio>
      <Radio
        description='Code like, great for a technical vibe'
        value='monospace'
      >
        Monospace
      </Radio>
    </RadioGroup>
  );
}
