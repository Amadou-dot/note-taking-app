import { Spinner } from '@heroui/spinner';

/**
 * A functional component that renders a loading spinner centered within a container.
 *
 * @returns A JSX element containing a loading spinner.
 */
export function LoadingSpinner() {
  return (
    <div className='flex h-40 w-full items-center justify-center'>
      <Spinner color='primary' label='Loading...' size='lg' variant='wave' />
    </div>
  );
}
