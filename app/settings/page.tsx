import { ThemeSwitch } from '@/components/theme-switch';

export default function settings() {
  return (
    <>
      <h1>settings page</h1>
      <div className='flex gap-4'>
        <p>Toggle Theme</p>
      <ThemeSwitch />
      </div>
    </>
  );
}
