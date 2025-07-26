import React, { createContext, useContext, useState } from "react";

type LegendFilters = {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    selectedRarity: string;
    setSelectedRarity: (val: string) => void;
    selectedFaction: string;
    setSelectedFaction: (val: string) => void;
    selectedGameMode: string;
    setSelectedGameMode: (val: string) => void;
};

const LegendFiltersContext = createContext<LegendFilters | undefined>(undefined);

export const LegendFiltersProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRarity, setSelectedRarity] = useState('All');
    const [selectedFaction, setSelectedFaction] = useState('All');
    const [selectedGameMode, setSelectedGameMode] = useState('All');

    return (
        <LegendFiltersContext.Provider
            value={{
                searchTerm,
                setSearchTerm,
                selectedRarity,
                setSelectedRarity,
                selectedFaction,
                setSelectedFaction,
                selectedGameMode,
                setSelectedGameMode,
            }}
        >
            {children}
        </LegendFiltersContext.Provider>
    );
};

export const useLegendFilters = () => {
    const context = useContext(LegendFiltersContext);
    if (!context) {
        throw new Error("useLegendFilters must be used within a LegendFiltersProvider");
    }
    return context;
};