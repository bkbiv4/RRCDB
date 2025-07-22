import legendData from "../data/legends.json";
import type {Legend} from "../types/legends.ts";
import {useSearchTerm, useSelectedFaction, useSelectedGameMode, useSelectedRarity} from "../hooks/utilityHooks.ts";


export const rushRoyaleLegends = legendData as Legend[];

export function useFilteredCards(): Legend[] {
    const [searchTerm] = useSearchTerm();
    const [selectedRarity] = useSelectedRarity();
    const [selectedFaction] = useSelectedFaction();
    const [selectedGameMode] = useSelectedGameMode();

    return rushRoyaleLegends.filter(legend => {
        const matchesSearch = legend.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRarity = selectedRarity === 'All' || legend.rarity === selectedRarity;
        const matchesFaction = selectedFaction === 'All' || legend.faction === selectedFaction;
        const matchesGameMode = selectedGameMode === 'All' || legend.gameModes?.includes(selectedGameMode);

        return matchesSearch && matchesRarity && matchesFaction && matchesGameMode;
    });
}
