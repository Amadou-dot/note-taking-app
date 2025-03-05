import { Spinner } from '@heroui/spinner';

export function LoadingSpinner() {
  return (
    <div className='flex h-40 w-full items-center justify-center'>
      <Spinner color='primary' label='Loading...' size='lg' variant='wave' />
    </div>
  );
}
