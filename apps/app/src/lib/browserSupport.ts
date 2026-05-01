export type SpeechRecognitionConstructorLike = new () => SpeechRecognition;

type SpeechRecognitionWindow = Partial<Pick<Window, "SpeechRecognition" | "webkitSpeechRecognition">>;

export function getSpeechRecognitionCtor(
  win: SpeechRecognitionWindow | undefined,
): SpeechRecognitionConstructorLike | null {
  if (!win) return null;
  return win.SpeechRecognition ?? win.webkitSpeechRecognition ?? null;
}

export function hasSpeechRecognition(win: SpeechRecognitionWindow | undefined): boolean {
  return getSpeechRecognitionCtor(win) !== null;
}

export function getSpeechRecognitionErrorMessage(error: string | undefined): string {
  switch (error) {
    case "not-allowed":
    case "service-not-allowed":
      return "Speech practice needs microphone permission. Use your browser's address-bar controls to allow the mic, then try again.";
    case "audio-capture":
      return "We couldn't hear your microphone. Check that a mic is connected and not muted, then try again.";
    case "network":
      return "Speech transcription had a network hiccup. Check your connection and try again.";
    case "no-speech":
      return "We didn't catch any words yet. Try again and speak clearly toward the microphone.";
    case "aborted":
      return "Speech practice stopped before we could finish. Press Start Speaking when you're ready to try again.";
    default:
      return "Speech transcription stopped unexpectedly. Chrome or Edge on a Chromebook/laptop works best for today's browser demo.";
  }
}

export const UNSUPPORTED_SPEECH_RECOGNITION_MESSAGE =
  "This browser can show BrightSpeaker, but it can't run the speaking demo yet. Try Chrome or Edge on a Chromebook or laptop so we can capture your words in the browser.";
