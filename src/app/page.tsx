// app/page.tsx

import { LogEntry } from '@prisma/client';

export default async function HomePage() {
  const res = await fetch('http://localhost:3000/api/logs', {
    cache: 'no-store',
  });
  const logs: LogEntry[] = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">ログ一覧</h1>

      {logs.length === 0 ? (
        <p>データがありません</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">日付</th>
              <th className="border p-2">体重(kg)</th>
              <th className="border p-2">禁煙</th>
              <th className="border p-2">種目</th>
              <th className="border p-2">メモ</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="border p-2">
                  {new Date(log.date).toLocaleDateString('ja-JP')}
                </td>
                <td className="border p-2">{log.weight}</td>
                <td className="border p-2">{log.isSmokeFree ? '✅' : '❌'}</td>
                <td className="border p-2">{log.workout ?? '-'}</td>
                <td className="border p-2">{log.memo ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
