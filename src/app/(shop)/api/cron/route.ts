import { getKites } from '@/lib/db';
import { NextResponse } from 'next/server';

// to prevent planetscale db from sleeping
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  await getKites();

  return NextResponse.json({ ok: true });
}
