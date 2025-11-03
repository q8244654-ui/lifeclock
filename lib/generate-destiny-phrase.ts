export function generateDestinyPhrase(profile: { dominantEnergy: string }, index: { lifeIndex: number }) {
  const essence: Record<string, string> = {
    Mind: "You were born to build what others only imagine.",
    Heart: "You were born to connect, to heal, to harmonize the world.",
    Drive: "You were born to ignite dormant fires in others.",
    Spirit: "You were born to dissolve separation — to remind the world of unity.",
  }

  const suffix =
    index.lifeIndex > 85
      ? "You've already begun fulfilling that purpose."
      : index.lifeIndex > 65
        ? "You're walking toward it — every choice is a fragment of your legacy."
        : "It's waiting, like an unopened letter, written in your own hand."

  return `${essence[profile.dominantEnergy]} ${suffix}`
}
