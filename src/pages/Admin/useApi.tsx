import { useEffect, useState } from "react";

interface BaseEntity {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

const useApi = <T,>(endpoint: string) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/${endpoint}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(`Error loading ${endpoint}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id: string) => {
        try {
            const response = await fetch(`/api/${endpoint}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            setData(prevData => prevData.filter(item => (item as BaseEntity)._id !== id));
            return true;
        } catch (err) {
            setError(`Error deleting ${endpoint}: ${err instanceof Error ? err.message : 'Unknown error'}`);
            return false;
        }
    };

    const addOrUpdateItem = async (item: Partial<T>, id?: string) => {
        try {
            const url = id ? `/api/${endpoint}/${id}` : `/api/${endpoint}`;
            const method = id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            await fetchData();
            return true;
        } catch (err) {
            setError(`Error saving ${endpoint}: ${err instanceof Error ? err.message : 'Unknown error'}`);
            return false;
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint, fetchData]);

    return { data, loading, error, fetchData, deleteItem, addOrUpdateItem };
};

export default useApi;