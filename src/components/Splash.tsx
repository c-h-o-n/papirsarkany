import Link from "next/link";

export default function Splash() {
  return (
    <section
      id="hello"
      className="home-pattern grid h-[calc(100vh-68px)] place-items-center sm:h-[calc(100vh-76px)]"
    >
      <div>
        <h1 className="hidden text-center font-bold min-[400px]:block ">
          www.papirsarkany.hu
        </h1>
        <Link href={"/sarkanyok"}>
          <h2 className="text-wrap-balance text-center font-semibold">
            Papírsárkány árusítás 1984-óta.
          </h2>
        </Link>
      </div>
    </section>
  );
}
