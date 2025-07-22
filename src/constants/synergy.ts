import { useDeckLegendToggler } from "../components/DeckBuilder.tsx";

// Synergy map
export const synergyMap: { [legendName: string]: string[] } = {
    "Inquisitor": ["Knight Statue", "Boreas", "Minotaur"],
    "Kobold": ["Summoner", "Demonologist", "Spirit Master"],
    "Cultist": ["Dryad", "Demon Hunter", "Blade Dancer"],
    "Bruiser": ["Scrapper", "Banshee", "Frost"],
    "Bard": ["Summoner", "Bruiser", "Genie"],
    "Twilight Ranger": ["Cultist", "Spirit Master", "Riding Hood"],
    "Tesla": ["Enchanted Sword", "Robot", "Meteor"],
    "Genie": ["Scrapper", "Minotaur", "Treant"],
    "Phoenix": ["Harlequin", "Monk", "Witch"]
};

// ✅ Custom hook that computes synergy suggestions
export function useSynergyTips(): string[] {
    const { selectedDeckLegends } = useDeckLegendToggler();

    const suggestions = selectedDeckLegends.flatMap(legend => {
        const synergies = synergyMap[legend.name] || [];
        return synergies.filter(
            syn => !selectedDeckLegends.some(c => c.name === syn)
        );
    });

    return [...new Set(suggestions)];
}
