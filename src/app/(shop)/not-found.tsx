import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid place-items-center">
      <div className="text-center">
        <h2>A keresett oldal nem található.</h2>
        <Link
          className="d-btn d-btn-ghost d-btn-lg normal-case"
          href="/sarkanyok"
        >
          Nézz szét a sárkányaink közt
        </Link>
      </div>
    </div>
  );
}
