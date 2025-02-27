'use client';
import { Radio, RadioGroup } from '@heroui/radio';
import { useIsSSR } from '@react-aria/ssr';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { FC } from 'react';

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
    // Map "auto" to "system" for next-themes
    setTheme(value === 'auto' ? 'system' : value);
  };

  // During SSR or when theme is not detected yet, default to 'auto'
  // Otherwise, if theme is 'system', display as 'auto'
  const currentTheme = isSSR ? 'auto' : (theme === 'system' ? 'auto' : theme || 'auto');
  
  return (
    <RadioGroup 
      className={clsx('space-y-2', className, classNames?.base)}
      value={currentTheme}
      onValueChange={handleThemeChange}
    >
      <Radio
        className={classNames?.radio}
        description='Select a clean and classic light theme'
        value='light'
      >
        Light theme
      </Radio>
      <Radio
        className={classNames?.radio}
        description='Select a sleek and modern dark theme'
        value='dark'
      >
        Dark theme
      </Radio>
      <Radio 
        className={classNames?.radio} 
        description="Adapts to your system's theme"
        value='auto'
      >
        System
      </Radio>
    </RadioGroup>
  );
};
