import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [result, setResult] = useState<number>(0); // Initialize result to 0

    // Function to validate if the input contains only alphanumeric characters
    const isValidQuery = (query: string): boolean => {
        return /^[a-zA-Z0-9]*$/.test(query);
    };

    // Function to calculate the sum of ASCII values of the alphanumeric characters
    const calculateAsciiSum = (query: string): number => {
        let sum = 0;
        for (let char of query) {
            sum += char.charCodeAt(0);
        }
        return sum;
    };

    // Handle the submit button click
    const handleSubmit = () => {
        if (isValidQuery(query)) {
            const sum = calculateAsciiSum(query);
            setResult(sum);

            // Update the URL with the query string
            const newUrl = `${window.location.pathname}?query=${encodeURIComponent(query)}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
        }
    };

    // Populate the search bar and result label if there's a query in the URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const queryParam = params.get('query');
        if (queryParam && isValidQuery(queryParam)) {
            setQuery(queryParam);
            setResult(calculateAsciiSum(queryParam));
        }
    }, []);

    return (
        <div className="container">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter an alphanumeric query"
            />
            <button onClick={handleSubmit}>Submit</button>
            <label>ASCII sum: {result}</label> {/* Update label to show "ASCII sum: [num]" */}
        </div>
    );
};

export default App;
