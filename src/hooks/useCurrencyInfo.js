import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                const response = await fetch(
                    `https://api.currencyapi.com/v3/latest?apikey=cur_live_7UStkUqQNBmahSoy8K635tE3Sjr5fK1UVPmVloZ2&base_currency=${currency}`
                );
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                const result = await response.json();
                setData(result.data);  // Assuming the API returns conversion rates in 'data'
                console.log("Fetched data:", result.data);
            } catch (err) {
                setError(err.message);
                console.error("Failed to fetch data:", err);
            }
        };

        if (currency) {
            fetchCurrencyData();
        }
    }, [currency]);

    if (error) {
        console.error("Error:", error);
    }

    return data;
}

export default useCurrencyInfo;
