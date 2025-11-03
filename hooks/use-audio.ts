import { useCallback } from 'react'
import { SOUNDS, AUDIO, VIBRATION } from '@/lib/constants'

export function useAudio() {
  const playSound = useCallback((sound: string, volume: number = AUDIO.DEFAULT_VOLUME) => {
    try {
      const audio = new Audio(`/sounds/${sound}.mp3`)
      audio.volume = volume
      audio.play().catch(() => {})
    } catch (e) {
      // Silent failure
    }
  }, [])

  const vibrate = useCallback((duration: number | number[]) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(duration)
    }
  }, [])

  const playWithVibration = useCallback(
    (sound: string, vibrateDuration: number, volume = AUDIO.DEFAULT_VOLUME) => {
      playSound(sound, volume)
      vibrate(vibrateDuration)
    },
    [playSound, vibrate],
  )

  const playRevelation = useCallback(() => {
    playSound(SOUNDS.TAP, AUDIO.DEFAULT_VOLUME)
    vibrate([50, 100, 50]) // Pattern spécial pour révélations
  }, [playSound, vibrate])

  const playMotivation = useCallback(() => {
    playSound(SOUNDS.TAP, AUDIO.DEFAULT_VOLUME)
    vibrate([50, 100, 50]) // Même pattern
  }, [playSound, vibrate])

  return {
    playSound,
    vibrate,
    playWithVibration,
    // Shortcuts
    playPop: () => playWithVibration(SOUNDS.POP, VIBRATION.LIGHT),
    playSend: () => playWithVibration(SOUNDS.SEND, VIBRATION.LIGHT),
    playComplete: () => playWithVibration(SOUNDS.COMPLETE, VIBRATION.MEDIUM),
    playChime: () => playWithVibration(SOUNDS.CHIME, VIBRATION.MEDIUM),
    playRevelation,
    playMotivation,
  }
}

