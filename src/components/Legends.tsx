import {rushRoyaleLegends, useFilteredCards} from "../utils/utils.ts";
import type {Legend} from "../types/legends.ts";


export const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Common'];
export const factions = [...new Set(rushRoyaleLegends.map(legend => legend.faction))];
export const gameModes = ['All', 'PvP', 'Co-op', 'Dungeon', 'Event'];

export type Rarity = "Legendary" | "Epic" | "Rare" | "Common";
export type Faction =
    | "Forest Alliance"
    | "Kingdom of Light"
    | "Magic Council"
    | "Dark Domain"
    | "Technogenic Society";

export type GroupedLegends = {
    [rarity in Rarity]?: {
        [faction in Faction]?: Legend[];
    };
};

export function useGroupedLegends(): GroupedLegends {
    const filteredCards = useFilteredCards();

    return filteredCards.reduce((acc, legend) => {
        const rarity = legend.rarity as Rarity;
        const faction = legend.faction as Faction;

        if (!acc[rarity]) {
            acc[rarity] = {};
        }
        if (!acc[rarity]![faction]) {
            acc[rarity]![faction] = [];
        }
        acc[rarity]![faction]!.push(legend);
        return acc;
    }, {} as GroupedLegends);
}