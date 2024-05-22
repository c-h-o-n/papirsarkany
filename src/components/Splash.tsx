import Link from 'next/link';

export default function Splash() {
  return (
    <section
      id='hello'
      className='home-pattern grid h-[calc(100dvh-68px)] place-items-center sm:h-[calc(100dvh-72px)] lg:h-[calc(100dvh-76px)]'
    >
      <div className='space-y-8 px-2 text-center sm:px-4'>
        <h1 className='font-bold max-[369px]:text-2xl'>www.papirsarkany.hu</h1>
        <Link
          href='/sarkanyok'
          className='d-btn d-btn-primary d-btn-block min-[370px]:d-btn-lg '
        >
          Papírsárkány árusítás 1984-óta.
        </Link>
      </div>
    </section>
  );
}
