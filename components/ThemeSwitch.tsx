'use client';
import { RadioGroup } from '@heroui/radio';
import { useIsSSR } from '@react-aria/ssr';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { FC } from 'react';
import {
  IoInvertModeOutline,
  IoMoonOutline,
  IoSunnyOutline
} from 'react-icons/io5';

import { CustomRadio } from './CustomRadio';
export interface ThemeSwitchProps {
  className?: string;
  classNames?: {
    base?: string;
    radio?: string;
  };
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  // During SSR or when theme is not detected yet, default to 'auto'
  const currentTheme = isSSR ? 'system' : theme || 'system';

  return (
    <RadioGroup
      className={clsx('space-y-2', className, classNames?.base)}
      value={currentTheme}
      onValueChange={handleThemeChange}
    >
      <CustomRadio
        className={classNames?.radio}
        classNames={{
          label: 'flex items-center gap-2',
        }}
        description='Select a clean and classic light theme'
        value='light'
      >
        <IoSunnyOutline size={20} /> Light theme
      </CustomRadio>
      <CustomRadio
        className={classNames?.radio}
        classNames={{
          label: 'flex items-center gap-2',
        }}
        description='Select a sleek and modern dark theme'
        value='dark'
      >
        <IoMoonOutline size={20} /> Dark theme
      </CustomRadio>
      <CustomRadio
        className={classNames?.radio}
        classNames={{
          label: 'flex items-center gap-2',
        }}
        description="Adapts to your system's theme"
        value='system'
      >
        <IoInvertModeOutline size={20} /> System
      </CustomRadio>
    </RadioGroup>
  );
};
