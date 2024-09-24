"use client";

const ComingSoon = () => {
  return (
    <div className="flex flex-col rounded-md shadow-sm items-center justify-center h-[85vh]">
      <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 rounded-md">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900">
          Coming Soon...
        </h1>
        <p className="text-lg md:text-xl mb-8 text-center max-w-md text-gray-700">
          {"We're working hard to bring something amazing to you. Stay tuned!"}
        </p>
        <div className="flex flex-col items-center mt-4">
          <p className="text-sm md:text-base italic text-gray-600">
            Thank you for your patience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
