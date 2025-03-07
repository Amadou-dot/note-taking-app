import FontSwitch from '@/components/FontSwitch';
import { ThemeSwitch } from '@/components/ThemeSwitch';

export default function SettingsPage() {
  return (
    <div className='h-[calc(100vh-4rem)] overflow-auto pb-20 px-4 mt-8 flex flex-col gap-6'>
      <div>
        <p className='flex flex-col text-lg font-semibold'>
          <span> Color Theme</span>
          <span className='text-sm text-gray-500'>Choose your color theme</span>
        </p>
        <ThemeSwitch />
      </div>
      <div>
        <p className='flex flex-col text-lg font-semibold'>
          <span>Font Theme</span>
          <span className='text-sm text-gray-500'>Choose your font theme</span>
        </p>
        <FontSwitch />
      </div>
    </div>
  );
}
