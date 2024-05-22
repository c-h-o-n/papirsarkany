import Logo from '@/assets/home.svg';

export default function Loading() {
  return (
    <div className='grid place-items-center'>
      <div className='animate-ping'>
        <Logo width={32} />
      </div>
    </div>
  );
}
