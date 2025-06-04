import React from 'react';
import Image from 'next/image';

export default function HormonalDietPlan() {
  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold text-brown-700 mb-2">Diet plan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Item 1 */}
        <div className="bg-amber-50 rounded-2xl p-4 text-center shadow">
          <Image src="/smartlabreports/dietplan7.png" alt="Limit caffeine and alcohol" width={160} height={128} className="rounded-lg mx-auto mb-2 object-cover" />
          <p>Limit caffeine and alcohol.</p>
        </div>

        {/* Item 2 */}
        <div className="bg-amber-50 rounded-2xl p-4 text-center shadow">
          <Image src="/smartlabreports/dietplan8.png" alt="Boost testosterone naturally" width={160} height={128} className="rounded-lg mx-auto mb-2 object-cover" />
          <p>Boost testosterone naturally: Zinc, vitamin D, and healthy fats (avocados, nuts)</p>
        </div>

        {/* Item 3 */}
        <div className="bg-amber-50 rounded-2xl p-4 text-center shadow">
          <Image src="/smartlabreports/dietplan9.png" alt="Maintain regular sleep" width={160} height={128} className="rounded-lg mx-auto mb-2 object-cover" />
          <p>Maintain a regular sleep schedule.</p>
        </div>

        {/* Item 4 */}
        <div className="bg-amber-50 rounded-2xl p-4 text-center shadow">
          <Image src="/smartlabreports/dietplan10.png" alt="Low-glycemic foods" width={160} height={128} className="rounded-lg mx-auto mb-2 object-cover" />
          <p>Prioritize low-glycemic foods.</p>
        </div>

        {/* Item 5 */}
        <div className="bg-amber-50 rounded-2xl p-4 text-center shadow">
          <Image src="/smartlabreports/dietplan11.png" alt="Avoid high-sugar and processed items" width={160} height={128} className="rounded-lg mx-auto mb-2 object-cover" />
          <p>Avoid high-sugar and processed items.</p>
        </div>

        {/* Item 6 */}
        <div className="bg-amber-50 rounded-2xl p-4 text-center shadow">
          <Image src="/smartlabreports/dietplan12.png" alt="Relaxation techniques" width={160} height={128} className="rounded-lg mx-auto mb-2 object-cover" />
          <p>Try relaxation techniques (yoga, breathing exercises)</p>
        </div>
      </div>
    </div>
  );
}
