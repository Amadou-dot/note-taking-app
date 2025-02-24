import { Button } from '@heroui/button';
import { FaApple, FaGoogle } from 'react-icons/fa';

export default function LoginProviders() {
  return (
    <>
      <Button className='w-full text-lg' variant='bordered'>
        <FaGoogle size={22} />
        Google
      </Button>
      <Button className='w-full text-lg' variant='bordered'>
        <FaApple size={22} />
        Apple
      </Button>
    </>
  );
}
