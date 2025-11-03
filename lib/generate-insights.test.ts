import { describe, it, expect } from "vitest"
// Test via exported helper to keep tests focused and deterministic
import { enforceUniqueSentencesAcrossRevelations, type Revelation } from "./generate-insights"

function rev(insight: string, title = "Test", category: Revelation["category"] = "pattern"): Revelation {
	return { category, title, insight, icon: "🔍" }
}

describe("enforceUniqueSentencesAcrossRevelations", () => {
	it("supprime les phrases strictement dupliquées entre révélations", () => {
		const revelations: Revelation[] = [
			rev("A. B."),
			rev("A. C."),
		]
		const out = enforceUniqueSentencesAcrossRevelations(revelations)
		// La deuxième révélation doit perdre "A." et conserver "C."
		expect(out[0].insight).toContain("A.")
		expect(out[0].insight).toContain("B.")
		expect(out[1].insight).not.toContain("A.")
		expect(out[1].insight).toContain("C.")
	})

	it("insensibilité casse/espaces/ponctuation finale/quotes HTML", () => {
		const revelations: Revelation[] = [
			rev(`<span class="quote-gold">"Même phrase"</span>  test...`),
			rev(`  "même phrase"   TEST!  `),
		]
		const out = enforceUniqueSentencesAcrossRevelations(revelations)
		// La seconde perd la phrase dupliquée, ne garde que TEST! si distinct
		expect(out[0].insight.toLowerCase()).toContain("même phrase")
		expect(out[1].insight.toLowerCase()).not.toContain("même phrase")
		// Il ne doit rester qu'une phrase dans la seconde (ou vide -> fallback géré au test suivant)
	})

	it("conserve au moins une phrase si tout est supprimé", () => {
		const revelations: Revelation[] = [
			rev(`"Quote". Autre.`),
			rev(`<span class="quote-gold">"Quote"</span>."Quote".`),
		]
		const out = enforceUniqueSentencesAcrossRevelations(revelations)
		// La deuxième aurait tout perdu, elle doit garder au moins sa première phrase originale
		expect(out[1].insight.length).toBeGreaterThan(0)
	})
})
