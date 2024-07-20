import React, { useState } from 'react';

interface TransactionFiltersProps {
  onFilterChange: (filter: string) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({ onFilterChange }) => {
    const [filter, setFilter] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        onFilterChange(newFilter);
    };

    return (
        <input
            type="text"
            placeholder="Filtrar transacciones..."
            value={filter}
            onChange={handleChange}
        />
    );
};

export default TransactionFilters;
