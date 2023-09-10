import Logo from '@/assets/logo.svg';
import Card from '@/components/Card';

export default function Home() {
  return (
    <div className='grid place-items-center'>
      <Logo className="w-full px-12 sm:w-[368px] " />

      <h1 className="font-bold text-2xl text-center">Hello papirsarkany@next! 🎉</h1>

      <Card>Hello Card!</Card>
    </div>
  );
}
