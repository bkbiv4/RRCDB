import type {CardClass} from "../types/legends.ts";
import {Heart, type LucideIcon, Star, Sword, Zap} from "lucide-react";

export const classIcons: Record<CardClass, LucideIcon> = {
    Damage: Sword,
    Support: Heart,
    Debuff: Zap,
    Special: Star
};
