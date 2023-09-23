import { getKitebySlug, getKites } from '@/lib/db';

export async function generateStaticParams() {
  const kites = await getKites();

  return kites.map((kite) => ({
    slug: kite.slug,
  }));
}

export default async function Kite({ params }: { params: { slug: string } }) {
  const kite = await getKitebySlug(params.slug);
  
  return (
    <div className="grid h-full place-items-center text-3xl">
      Post: {params.slug} <br /> {kite && kite.name}
    </div>
  );
}
