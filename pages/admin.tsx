"use client";
import React, { useEffect, useState } from "react";

interface QuizResult {
  id: string;
  name: string;
  email: string;
  answers: string[];
  timestamp: string;
}

const AdminDashboard: React.FC = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/get-results");
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error("Failed to fetch results");
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard - Quiz Results</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 border border-gray-700">Name</th>
                <th className="p-3 border border-gray-700">Email</th>
                <th className="p-3 border border-gray-700">Answers</th>
                <th className="p-3 border border-gray-700">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id} className="bg-gray-800 hover:bg-gray-700">
                  <td className="p-3 border border-gray-700">{result.name}</td>
                  <td className="p-3 border border-gray-700">{result.email}</td>
                  <td className="p-3 border border-gray-700">
                    {result.answers.map((ans, index) => (
                      <p key={index}>
                        <strong>Q{index + 1}:</strong> {ans}
                      </p>
                    ))}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {new Date(result.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
