import FontSwitch from '@/components/FontSwitch';
import { ThemeSwitch } from '@/components/theme-switch';

export default function settings() {
  return (
    <div className='flex flex-col gap-4 divide-y px-4 *:flex *:flex-col *:gap-4'>
      <div className=''>
        <p className='text-lg font-semibold'>Color Theme</p>
        <ThemeSwitch />
      </div>
      <div className=''>
        <p className='text-lg font-semibold'>Font Theme</p>
        <FontSwitch />
      </div>
    </div>
  );
}
