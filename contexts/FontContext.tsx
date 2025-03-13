'use client';
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

/**
 * Provides font context to its children components.
 *
 * @param {Object} props - The properties object.
 * @param {ReactNode} props.children - The child components to be wrapped by the provider.
 *
 * @returns {JSX.Element} The FontContext provider with the appropriate font class applied.
 *
 * @remarks
 * This component uses a context to manage the font state and provides a method to get the appropriate font class based on the current font selection.
 *
 * @example
 * ```tsx
 * <FontProvider>
 *   <YourComponent />
 * </FontProvider>
 * ```
 */
export function FontProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
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
