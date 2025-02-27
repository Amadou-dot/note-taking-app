'use client'
import { Inter, Merriweather, Roboto_Mono } from 'next/font/google';
import { createContext, ReactNode, useContext, useState } from 'react';

// Initialize fonts
const sans = Inter({ subsets: ['latin'] });
const serif = Merriweather({ weight: ['400', '700'], subsets: ['latin'] });
const mono = Roboto_Mono({ subsets: ['latin'] });

type FontType = 'sans-serif' | 'serif' | 'monospace';

interface FontContextType {
  font: FontType;
  setFont: (font: FontType) => void;
  fontClass: string;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<FontType>('sans-serif');

  // Get the appropriate font class based on selection
  const getFontClass = () => {
    switch (font) {
      case 'sans-serif':
        return sans.className;
      case 'serif':
        return serif.className;
      case 'monospace':
        return mono.className;
      default:
        return sans.className;
    }
  };

  return (
    <FontContext.Provider value={{ font, setFont, fontClass: getFontClass() }}>
      <div className={getFontClass()}>{children}</div>
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);

  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }

  return context;
}

// Export the font objects for direct usage if needed
export const fonts = { sans, serif, mono };
