import React, { useEffect, useState } from "react";

interface QuoteResponse {
  id: number;
  quote: string;
}

const LanguagesPage: React.FC = () => {
  const [quote, setData] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: QuoteResponse = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Quotes</h1>
      {quote ? (
        <ul>
          <h1>{quote.quote}</h1>
        </ul>
      ) : (
        <p>No quote availbable</p>
      )}
    </div>
  );
};

export default LanguagesPage;
