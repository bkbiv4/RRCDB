import type {Legend} from "../types/legend2.ts";

const legendModules = import.meta.glob<{ default: Legend}>(
    "../data/legends/*/*/*.json",
    { eager: true}
)

export const rushRoyaleLegends: Legend[] = Object.values(legendModules).map(
    (mod) => mod.default
)

import {useLegendFilters} from "../hooks/legendFiltersContext.tsx";

export function useFilteredCards(): Legend[] {
    const {
        searchTerm,
        selectedRarity,
        selectedFaction,
        selectedGameMode
    } = useLegendFilters();

    return rushRoyaleLegends.filter(legend => {
        const matchesSearch = legend.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRarity = selectedRarity === 'All' || legend.rarity === selectedRarity;
        const matchesFaction = selectedFaction === 'All' || legend.faction === selectedFaction;
        const matchesGameMode = selectedGameMode === 'All' || legend.gameModes?.includes(selectedGameMode);

        return matchesSearch && matchesRarity && matchesFaction && matchesGameMode;
    });
}
