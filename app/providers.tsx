'use client';

import type { ThemeProviderProps } from 'next-themes';

import { HeroUIProvider } from '@heroui/system';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { ToastContainer } from 'react-toastify';

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

/**
 * Providers component that wraps the application with various context providers.
 *
 * @param {ProvidersProps} props - The props for the Providers component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the providers.
 * @param {object} props.themeProps - The properties for the NextThemesProvider.
 *
 * @returns {JSX.Element} The wrapped child components with the necessary providers.
 */
export function Providers({ children, themeProps }: ProvidersProps): JSX.Element {
  const router = useRouter();
  const { theme } = useTheme();
  const toastTheme = theme === 'system' ? 'dark' : theme;

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <NotesProvider>
          <FontProvider>{children}</FontProvider>
          <ToastContainer position='bottom-center' theme={toastTheme} />
        </NotesProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
