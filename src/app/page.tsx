import Logo from '@/assets/logo.svg';
import Card from '@/components/Card';

export default function Home() {
  return (
    <>
      <Logo className="w-full px-12 sm:w-[368px] " />

      <h1 className="font-bold text-5xl text-center">Hello papirsarkany@next! 🎉</h1>

      <Card>Hello Card!</Card>
    </>
  );
}
