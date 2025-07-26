export type Rarity = "Legendary" | "Epic" | "Rare" | "Common";

export type UnitType = "Damage" | "Support" | "Debuff" | "Special";

export type Faction =
    | "Forest Alliance"
    | "Kingdom of Light"
    | "Magic Council"
    | "Dark Domain"
    | "Technogenic Society";

export interface MergeRank {
    rank: number;
    attack_speed: number;
    max_charges: number;
    damage_per_second: number;
}

export interface ManaLevel {
    level: number;
    total_damage: number;
    total_charge_damage: number;
    hero_cooldown_percent: number;
    merge_ranks: MergeRank[];
}

export interface CardLevel {
    level: number;
    mana_levels: ManaLevel[];
}

export interface Talent {
    name: string;
    description: string;
}

export interface Legend {
    id: number;
    name: string;
    rarity: Rarity;
    unitType: UnitType;
    faction: Faction;
    image: string;

    // new fields matching your JSON
    synergyTags: string[];
    gameModes: string[];
    archetype: string;
    pros: string;
    cons: string;

    base_stats: {
        range: string;
        target: string;
        morale?: number;
    };

    card_levels: {
        [cardLevel: string]: {
            mana_levels: {
                [manaLevel: string]: {
                    total_damage: number;
                    total_charge_damage: number;
                    hero_cooldown_percent: number;
                    merge_ranks: {
                        [rank: string]: {
                            attack_speed: number;
                            max_charges: number;
                            damage_per_second: number;
                        };
                    };
                };
            };
        };
    };

    talents: Talent[];

    description: string;

    scaling_notes: {
        damage_scaling: string;
        charge_scaling: string;
        merge_scaling: string;
        card_level_scaling: string;
    };
}