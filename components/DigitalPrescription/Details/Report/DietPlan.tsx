import React from 'react';
import Image from 'next/image';

export default function DietPlan() {
  const plans = [
    {
      image: '/smartlabreports/dietplan1.png',
      text: 'Consider dietary changes (low saturated fats, high fiber) and regular monitoring.',
    },
    {
      image: '/smartlabreports/dietplan2.png',
      text: 'Consider omega-3 intake to help raise HDL and limit sugar and refined carbs.',
    },
    {
      image: '/smartlabreports/dietplan3.png',
      text: 'Include more physical activity and continue maintaining healthy habits.',
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-[#8B5E3C] mb-6">Diet plan</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-[#F6F0E3] p-4 rounded-2xl text-center shadow-sm"
          >
            <div className="relative h-40 w-60 mx-auto mb-4 rounded-xl overflow-hidden">
              <Image
                src={item.image}
                alt={`Diet Plan ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-black">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
