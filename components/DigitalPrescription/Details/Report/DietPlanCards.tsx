import React from 'react';
import Image from 'next/image';

const dietCards = [
  {
    image: '/smartlabreports/dietplan4.png', // Replace with your static path
    text: 'Focus on high-fiber foods (vegetables, legumes, whole grains)',
  },
  {
    image: '/smartlabreports/dietplan5.png', // Replace with your static path
    text: 'Add aerobic exercise (like brisk walking or cycling) 4–5 times a week',
  },
  {
    image: '/smartlabreports/dietplan6.png', // Replace with your static path
    text: 'Discuss screening for insulin resistance or HbA1c with your doctor if you\'re at risk.',
  },
];

const DietPlanCards = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-brown-700 mb-6">Diet plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dietCards.map((card, index) => (
          <div key={index} className="bg-[#f5f2e9] p-6 rounded-3xl shadow-md text-center">
            <div className="rounded-xl overflow-hidden mb-4">
              <Image
                src={card.image}
                alt="diet tip"
                width={300}
                height={200}
                className="mx-auto rounded-xl"
              />
            </div>
            <p className="text-black text-base">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlanCards;
