export default function Kite({ params }: { params: { slug: string } }) {
  return <div className='text-3xl h-full grid place-items-center'>Post: {params.slug}</div>
}