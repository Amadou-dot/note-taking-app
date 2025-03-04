'use client';

import type { ThemeProviderProps } from 'next-themes';

import { HeroUIProvider } from '@heroui/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { FontProvider } from '@/contexts/FontContext';
import { NotesProvider } from '@/contexts/NotesContext';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <NotesProvider>
          <FontProvider>{children}</FontProvider>
        </NotesProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
