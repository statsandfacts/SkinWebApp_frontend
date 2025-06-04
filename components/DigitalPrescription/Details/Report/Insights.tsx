import React from 'react';

export default function Insights() {
  const insights = [
    {
      title: 'HDL Cholesterol',
      tagColor: 'bg-red-500',
      heading: 'Your HDL Ch. level is low',
      content: `HDL is your "good" cholesterol—it helps remove excess LDL ("bad") cholesterol from your arteries.
A level below 40 mg/dL is considered low and may increase your risk of heart disease.`,
    },
    {
      title: 'Lipoprotein (a)',
      tagColor: 'bg-blue-500',
      heading: 'Your Lp(a) is low',
      content: `While low levels of Lp(a) are associated with a decreased risk of cardiovascular disease, they can also increase the risk of developing type 2 diabetes and non-alcoholic liver disease (NAFLD).`,
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Insights</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-red-100 rounded-3xl p-4 shadow-md border border-red-200"
          >
            <div
              className={`text-white text-xs px-2 py-0.5 rounded-md inline-block mb-2 ${insight.tagColor}`}
            >
              {insight.title}
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{insight.heading}</h3>
            <p className="text-lg text-gray-800 font-xl whitespace-pre-line">{insight.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
