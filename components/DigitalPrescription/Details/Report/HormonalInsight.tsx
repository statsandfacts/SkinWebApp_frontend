import React from 'react';

export default function HormonalInsight() {
  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold text-green-600 mb-6">Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Testosterone */}
        <div className="rounded-xl bg-red-100 p-4 shadow">
          <div className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded">Total Testosterone</div>
          <h3 className="font-bold mt-2">Your Testosterone is Very abnormal</h3>
          <p className="text-sm mt-1">
            Low testosterone may lead to reduced libido, fatigue, muscle weakness, and mood fluctuations. Long-term deficiency may contribute to metabolic and cardiovascular risks.
          </p>
        </div>

        {/* Morning Cortisol */}
        <div className="rounded-xl bg-red-100 p-4 shadow">
          <div className="inline-block bg-orange-400 text-white text-xs px-2 py-1 rounded">Morning Cortisol</div>
          <h3 className="font-bold mt-2">Your Cortisol is Abnormal</h3>
          <p className="text-sm mt-1">
            Elevated cortisol levels may be due to chronic stress, poor sleep, or over-training. Persistently high levels can impair immunity, disrupt sleep, and lead to weight gain or insulin resistance.
          </p>
        </div>

        {/* TSH */}
        <div className="rounded-xl bg-red-100 p-4 shadow">
          <div className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded">TSH</div>
          <h3 className="font-bold mt-2">Your Testosterone is Very abnormal</h3>
          <p className="text-sm mt-1">
            Low testosterone may lead to reduced libido, fatigue, muscle weakness, and mood fluctuations. Long-term deficiency may contribute to metabolic and cardiovascular risks.
          </p>
        </div>

        {/* Morning Cortisol duplicate */}
        <div className="rounded-xl bg-red-100 p-4 shadow">
          <div className="inline-block bg-orange-400 text-white text-xs px-2 py-1 rounded">Morning Cortisol</div>
          <h3 className="font-bold mt-2">Your Cortisol is Abnormal</h3>
          <p className="text-sm mt-1">
            Elevated cortisol levels may be due to chronic stress, poor sleep, or over-training. Persistently high levels can impair immunity, disrupt sleep, and lead to weight gain or insulin resistance.
          </p>
        </div>
      </div>
    </div>
  );
}
