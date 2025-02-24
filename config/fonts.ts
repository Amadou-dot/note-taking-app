import {
  Fira_Code as FontMono,
  Rouge_Script as FontRouge,
  Inter as FontSans,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const fontRouge = FontRouge({
  subsets: ['latin'],
  variable: '--font-rouge',
  preload: true,
  weight: '400',
});
