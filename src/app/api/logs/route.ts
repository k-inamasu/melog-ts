import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const logs = await prisma.logEntry.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(logs);
  } catch (error) {
    console.error('[GET /api/logs] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newLog = await prisma.logEntry.create({
      data: {
        date: new Date(body.date),
        weight: parseFloat(body.weight),
        isSmokeFree: body.isSmokeFree,
        workout: body.workout || null,
        workoutDetail: body.workoutDetail || null,
        memo: body.memo || null,
      },
    });

    return NextResponse.json(newLog, { status: 201 });
  } catch (error) {
    console.error('[POST /api/logs] Error:', error);
    return NextResponse.json({ error: '登録に失敗しました' }, { status: 500 });
  }
}
