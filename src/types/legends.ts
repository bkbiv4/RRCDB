export type Rarity = "Legendary" | "Epic" | "Rare" | "Common";

export type CardClass = "Damage" | "Support" | "Debuff" | "Special";

export type Faction =
    | "Forest Alliance"
    | "Kingdom of Light"
    | "Magic Council"
    | "Dark Domain"
    | "Technogenic Society";

export interface Legend {
    id: number;
    name: string;
    rarity: Rarity;
    class: CardClass;
    faction: Faction;
    image: string;

    // ✅ new fields
    manaCost: number;
    synergyTags: string[];
    gameModes: string[];
    archetype: string;
    pros: string;
    cons: string;

    base_stats: {
        damage: number;
        attack_speed?: number;
        morale?: number;
        activation_interval?: string;
        range: string;
        target: string;
    };

    levels: {
        level: number;
        damage: number;
        attack_speed?: number;
        morale?: number;
        mana_efficiency?: number;
    }[];

    talents: {
        name: string;
        description: string;
    }[];

    description: string;
}
