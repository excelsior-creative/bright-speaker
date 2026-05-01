import { describe, expect, it } from "vitest";
import { getSpeechRecognitionCtor, getSpeechRecognitionErrorMessage, hasSpeechRecognition } from "./browserSupport";

describe("browser speech recognition support", () => {
  class NativeRecognition {};
  class WebkitRecognition {};

  it("returns false without a window", () => {
    expect(hasSpeechRecognition(undefined)).toBe(false);
    expect(getSpeechRecognitionCtor(undefined)).toBeNull();
  });

  it("detects standard SpeechRecognition", () => {
    const win = { SpeechRecognition: NativeRecognition as unknown as SpeechRecognitionConstructor };
    expect(hasSpeechRecognition(win)).toBe(true);
    expect(getSpeechRecognitionCtor(win)).toBe(NativeRecognition);
  });

  it("detects webkitSpeechRecognition fallback", () => {
    const win = { webkitSpeechRecognition: WebkitRecognition as unknown as SpeechRecognitionConstructor };
    expect(hasSpeechRecognition(win)).toBe(true);
    expect(getSpeechRecognitionCtor(win)).toBe(WebkitRecognition);
  });

  it("returns false when no speech recognition constructor exists", () => {
    expect(hasSpeechRecognition({})).toBe(false);
    expect(getSpeechRecognitionCtor({})).toBeNull();
  });

  it("maps common runtime speech errors to visible messages", () => {
    expect(getSpeechRecognitionErrorMessage("not-allowed")).toContain("microphone permission");
    expect(getSpeechRecognitionErrorMessage("audio-capture")).toContain("microphone");
    expect(getSpeechRecognitionErrorMessage("network")).toContain("network");
    expect(getSpeechRecognitionErrorMessage("no-speech")).toContain("words");
    expect(getSpeechRecognitionErrorMessage("something-new")).toContain("Chrome or Edge");
  });
});
