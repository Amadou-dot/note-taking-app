import LoginProviders from '@/components/LoginProviders';
import { Logo } from '@/components/Logo';

export const metadata = {
  title: 'Login',
};
export default function LoginPage() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex w-full max-w-[700px] flex-col items-center rounded-lg bg-slate-900 px-4'>
        {/* Welcome messages */}
        <div className='mb-4 mt-12 flex flex-col items-center gap-4'>
          <Logo/>
          <div className='text-2xl'>Welcome to Note</div>
          <p className='text-slate-500'>Please log in to continue</p>
        </div>
        {/* Other login Options */}
        <div className='mb-10 flex w-full flex-col items-center gap-4 py-4'>
          <LoginProviders />
        </div>
        {/* Sign up */}
        {/* <p aria-label='No account yet? Sign up' className='my-8 flex gap-1'>
          <span>No account yet?</span>
          <a className='font-semibold' href='signup'>
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
}
