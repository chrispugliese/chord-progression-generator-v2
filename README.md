# Chord Progression Generator v2

A browser-based chord progression generator with music theory baked in. You can choose a key, set how many notes each chord should contain, set the progression length, audition the harmony in the browser, and export the result as a MIDI file for Ableton or any other DAW.

## Features

- Select any chromatic key center and choose from major, natural minor, dorian, phrygian, lydian, mixolydian, locrian, harmonic minor, and melodic minor.
- Generate 3-note to 7-note chord voicings.
- Set the progression length from 2 to 12 chords.
- Blend diatonic harmony with borrowed chords, secondary dominants, altered dominants, diminished approach chords, and suspended colors.
- Play back individual chords or the full progression in the browser.
- Download the progression as a `.mid` file.

## Run locally

```bash
npm start
```

The script will print the exact local URL to open.

If you want a specific port, you can set one explicitly:

```bash
PORT=4173 npm start
```
