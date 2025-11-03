import { phase1 } from "./phase1"
import { phase2 } from "./phase2"
import { phase3 } from "./phase3"
import { phase4 } from "./phase4"
import { phase5 } from "./phase5"
import { phase6 } from "./phase6"
import { phase7 } from "./phase7"
import { phase8 } from "./phase8"
import { phase9 } from "./phase9"
import { phase10 } from "./phase10"

export const phases = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8, phase9, phase10]

export type Phase = typeof phase1
export type Question = Phase["questions"][0]
export type Option = Question["options"][0]
export type Answer = { value: number; feedback: string }
