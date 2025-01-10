// components/SalesContentCreation.tsx
"use client";

const SalesContentCreation: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Sales & Content Creation Quiz</h2>
        <p className="mb-4">
          Answer questions related to Sales and Content Creation to proceed.
        </p>
        {/* Add quiz content specific to this pair */}
        <button className="w-full p-3 bg-green-500 text-white rounded-md mt-4">
          Submit & Continue
        </button>
      </div>
    </div>
  );
};

export default SalesContentCreation;
