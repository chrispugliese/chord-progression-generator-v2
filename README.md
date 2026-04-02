# Chord Progression Generator v2

A browser-based chord progression generator for writing harmony quickly, auditioning it in the browser, and exporting it as MIDI for Ableton Live or any other DAW.

This project is designed to feel musical rather than purely random. You choose a key and mode, shape the harmony and playback settings, generate a progression, listen back immediately, and export a `.mid` file that you can drag into your production workflow.

## What the app does

- Generates chord progressions in a selected key and mode.
- Supports multiple modes:
  `Major`, `Natural Minor`, `Dorian`, `Phrygian`, `Lydian`, `Mixolydian`, `Locrian`, `Harmonic Minor`, and `Melodic Minor`.
- Lets you control harmony density:
  chord size, progression length, non-diatonic color, cadence preference, and unique-chord behavior.
- Lets you control playback:
  tempo, waveform, note length, octave, articulation, arpeggiation, arp division, and humanization.
- Plays chords directly in the browser with the Web Audio API.
- Exports the generated progression as a MIDI file for use in Ableton or other DAWs.

## Stack

This app is intentionally lightweight.

- `HTML`
  UI structure and form controls
- `CSS`
  layout, styling, drawer sections, and responsive behavior
- `Vanilla JavaScript`
  theory engine, chord generation, voicing logic, playback, and MIDI export
- `Node.js`
  local static server via `scripts/serve.mjs`
- `Web Audio API`
  browser playback for chords and progressions
- `Custom MIDI writer`
  MIDI file bytes are generated directly in JavaScript without an external MIDI library

There are no frontend frameworks or runtime dependencies in this version.

## Project structure

```text
.
├── index.html          # UI markup
├── style.css           # Visual styling and layout
├── app.js              # Theory engine, playback, and MIDI export
├── package.json        # Local run scripts
└── scripts/
    └── serve.mjs       # Lightweight local static server
```

## Run locally

### Requirements

- Node.js 18+ is recommended

### Start the app

```bash
npm start
```

The local server will print a URL like:

```bash
Chord Progression Generator running at http://127.0.0.1:xxxxx
```

Open that URL in your browser.

### Optional: choose a port manually

```bash
PORT=4173 npm start
```

## How to use the app

### 1. Choose the tonal center

- Select a `Key center`
- Select a `Mode`

These are the always-visible core controls.

### 2. Open the advanced drawer

The drawer is split into three sections:

- `Harmony`
- `Playback`
- `Variation`

### 3. Adjust harmony settings

In `Harmony`, you can control:

- `Chord size`
  Number of notes per chord
- `Progression length`
  Number of chords in the progression
- `Include non-diatonic color`
  Allows borrowed chords, secondary dominants, altered dominants, and other color tones
- `Prefer strong cadences`
  Pushes endings toward stronger resolution
- `Unique chords only`
  Prevents repeated chord choices when possible

### 4. Adjust playback settings

In `Playback`, you can control:

- `Tempo`
- `Playback voice`
  `Sine`, `Triangle`, or `Saw`
- `Note length`
- `Octave`
- `Articulation`
  `Normal`, `Staccato`, or `Sustain`

### 5. Adjust variation settings

In `Variation`, you can control:

- `Arpeggiate chords`
- `Arp length`
  Fixed rhythmic divisions:
  `1/4`, `1/8`, `1/16`, `1/32`
- `Humanize timing`

### 6. Generate, play, stop, export

- Click `Generate progression` to create a new progression
- Click `Play` to audition the full progression
- Click `Stop` to stop scheduled and active playback
- Click `Download MIDI` to export the progression

Important behavior:

- Changing settings updates the selected parameters, but does not generate a new progression until you click `Generate progression`
- Playback and MIDI export use the same performance-planning logic, so what you hear is much closer to what gets exported

## How it works

### Theory engine

The theory engine lives in `app.js`.

At a high level, it:

1. Builds a scale from the chosen key and mode
2. Constructs a pool of possible chords
3. Weights chord choices by harmonic function
4. Generates a progression
5. Applies voicing and voice-leading rules

The chord pool can include:

- diatonic chords
- extended diatonic chords
- suspended chords
- borrowed chords
- secondary dominants
- leading-tone approach chords
- altered dominant colors

### Progression generation

The generator uses harmonic roles such as:

- tonic
- pre-dominant
- dominant
- color
- approach

It then transitions between those roles with simple musical rules instead of choosing chords completely at random.

### Voicing

After the chord symbols are selected, the app creates MIDI-note voicings and smooths them to reduce large jumps between chords.

The voicing logic also:

- respects the chosen octave
- preserves the requested chord size
- prevents note collisions that would make larger chords sound like triads

### Playback

Playback is done in the browser using the Web Audio API.

The app:

- converts MIDI note numbers to frequencies
- schedules oscillators for each note
- applies waveform and articulation settings
- supports block chords or arpeggiated playback
- optionally humanizes timing and velocity behavior

### MIDI export

The MIDI exporter writes a standard MIDI file directly in JavaScript.

It:

- writes the MIDI header and track data
- inserts tempo metadata
- uses the same planned note events as playback
- exports note-on and note-off events with timing and velocity

The export filename includes useful context such as:

- key
- mode
- tempo
- note length
- octave
- arp/block mode
- humanized vs quantized state
- date

## Current capabilities

- Theory-aware chord generation
- Multiple modes
- Variable chord sizes
- Variable progression lengths
- Unique-chord option
- Browser playback
- Stop transport
- MIDI export
- Arpeggiation with selectable rhythmic divisions
- Humanization
- Drawer-organized controls

## Notes for contributors

If you want to extend the project, the most important areas are:

- `SCALES`
  mode definitions and borrowed-mode relationships
- `buildChordPool`
  harmonic vocabulary
- `generateProgression`
  progression rules and weighting
- `buildVoicing`
  chord spacing and octave placement
- `buildPerformancePlan`
  playback/export event timing
- `buildMidiFile`
  exported MIDI structure

## Ideas for future improvements

- Arp direction options:
  up, down, up-down, random
- Swing or groove settings
- Inversions / slash chords
- Roman numeral display mode
- Genre presets
- Better MIDI multi-track export
- Velocity curves and dynamic accents

## License

No license has been added yet. If you plan to share or open-source this project, add a license file that matches your intended usage.
