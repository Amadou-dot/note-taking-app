import FontSwitch from '@/components/FontSwitch';
import PageTitle from '@/components/PageTitle';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { IoSunnyOutline } from 'react-icons/io5';

export default function settings() {
  return (
    <div className='flex flex-col gap-4 px-4 *:flex *:flex-col *:gap-4'>
      <PageTitle className='lg:hidden' />
      <div className=''>
        <p className='flex flex-col text-lg font-semibold'>
          Color Theme{' '}
          <span className='text-sm text-gray-500'>Choose your color theme</span>
        </p>
        <ThemeSwitch />
      </div>
      <div className=''>
      <p className='flex flex-col text-lg font-semibold'>
          Font Theme{' '}
          <span className='text-sm text-gray-500'>Choose your font theme</span>
        </p>
        <FontSwitch />
      </div>
    </div>
  );
}
