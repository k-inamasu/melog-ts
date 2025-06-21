'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewLogPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    date: '',
    weight: '',
    isSmokeFree: false,
    workout: '',
    workoutDetail: '',
    memo: '',
  });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('登録に失敗しました');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const target = e.target as HTMLInputElement;
  const { name, value, type, checked } = target;

  setForm({
    ...form,
    [name]: type === 'checkbox' ? checked : value,
  });
};


  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">新規ログ登録</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <input
          type="number"
          name="weight"
          value={form.weight}
          onChange={handleChange}
          step="0.1"
          placeholder="体重 (kg)"
          className="w-full border p-2"
          required
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isSmokeFree"
            checked={form.isSmokeFree}
            onChange={handleChange}
          />
          <span>禁煙継続</span>
        </label>

        <input
          type="text"
          name="workout"
          value={form.workout}
          onChange={handleChange}
          placeholder="種目（例：胸・肩の日）"
          className="w-full border p-2"
        />

        <textarea
          name="memo"
          value={form.memo}
          onChange={handleChange}
          placeholder="メモ"
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          登録する
        </button>
      </form>
    </main>
  );
}
