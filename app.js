const NOTE_NAMES = [
  { label: "C", short: "C" },
  { label: "C#/Db", short: "C#" },
  { label: "D", short: "D" },
  { label: "D#/Eb", short: "D#" },
  { label: "E", short: "E" },
  { label: "F", short: "F" },
  { label: "F#/Gb", short: "F#" },
  { label: "G", short: "G" },
  { label: "G#/Ab", short: "G#" },
  { label: "A", short: "A" },
  { label: "A#/Bb", short: "A#" },
  { label: "B", short: "B" }
];

const SCALES = {
  major: {
    label: "Major",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    borrowFrom: "minor"
  },
  minor: {
    label: "Natural Minor",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    borrowFrom: "major"
  },
  dorian: {
    label: "Dorian",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    borrowFrom: "minor"
  },
  phrygian: {
    label: "Phrygian",
    intervals: [0, 1, 3, 5, 7, 8, 10],
    borrowFrom: "minor"
  },
  lydian: {
    label: "Lydian",
    intervals: [0, 2, 4, 6, 7, 9, 11],
    borrowFrom: "major"
  },
  mixolydian: {
    label: "Mixolydian",
    intervals: [0, 2, 4, 5, 7, 9, 10],
    borrowFrom: "major"
  },
  locrian: {
    label: "Locrian",
    intervals: [0, 1, 3, 5, 6, 8, 10],
    borrowFrom: "minor"
  },
  harmonicMinor: {
    label: "Harmonic Minor",
    intervals: [0, 2, 3, 5, 7, 8, 11],
    borrowFrom: "major"
  },
  melodicMinor: {
    label: "Melodic Minor",
    intervals: [0, 2, 3, 5, 7, 9, 11],
    borrowFrom: "major"
  }
};

const FUNCTION_LABELS = {
  tonic: "Tonic",
  preDominant: "Pre-dominant",
  dominant: "Dominant",
  color: "Color",
  approach: "Approach"
};

const QUALITY_LIBRARY = {
  triadMaj: { suffix: "", intervals: [0, 4, 7], family: "major" },
  triadMin: { suffix: "m", intervals: [0, 3, 7], family: "minor" },
  triadDim: { suffix: "dim", intervals: [0, 3, 6], family: "diminished" },
  triadAug: { suffix: "aug", intervals: [0, 4, 8], family: "augmented" },
  maj7: { suffix: "maj7", intervals: [0, 4, 7, 11], family: "major" },
  dom7: { suffix: "7", intervals: [0, 4, 7, 10], family: "dominant" },
  min7: { suffix: "m7", intervals: [0, 3, 7, 10], family: "minor" },
  halfDim7: { suffix: "m7b5", intervals: [0, 3, 6, 10], family: "half-diminished" },
  dim7: { suffix: "dim7", intervals: [0, 3, 6, 9], family: "diminished" },
  minMaj7: { suffix: "mMaj7", intervals: [0, 3, 7, 11], family: "minor-major" },
  add9: { suffix: "add9", intervals: [0, 4, 7, 14], family: "major" },
  minAdd9: { suffix: "madd9", intervals: [0, 3, 7, 14], family: "minor" },
  six: { suffix: "6", intervals: [0, 4, 7, 9], family: "major" },
  min6: { suffix: "m6", intervals: [0, 3, 7, 9], family: "minor" },
  sus2: { suffix: "sus2", intervals: [0, 2, 7], family: "suspended" },
  sus4: { suffix: "sus4", intervals: [0, 5, 7], family: "suspended" },
  sevenSus4: { suffix: "7sus4", intervals: [0, 5, 7, 10, 14], family: "dominant" },
  maj9: { suffix: "maj9", intervals: [0, 4, 7, 11, 14], family: "major" },
  dom9: { suffix: "9", intervals: [0, 4, 7, 10, 14], family: "dominant" },
  min9: { suffix: "m9", intervals: [0, 3, 7, 10, 14], family: "minor" },
  dom11: { suffix: "11", intervals: [0, 4, 7, 10, 14, 17], family: "dominant" },
  min11: { suffix: "m11", intervals: [0, 3, 7, 10, 14, 17], family: "minor" },
  dom13: { suffix: "13", intervals: [0, 4, 7, 10, 14, 21], family: "dominant" },
  maj13: { suffix: "maj13", intervals: [0, 4, 7, 11, 14, 21], family: "major" },
  sevenFlat9: { suffix: "7b9", intervals: [0, 4, 7, 10, 13], family: "altered" },
  sevenSharp9: { suffix: "7#9", intervals: [0, 4, 7, 10, 15], family: "altered" },
  sevenFlat13: { suffix: "7b13", intervals: [0, 4, 7, 10, 14, 20], family: "altered" }
};

const DEGREE_NAMES = ["I", "II", "III", "IV", "V", "VI", "VII"];

const state = {
  settings: {
    keyRoot: 0,
    scaleType: "major",
    chordSize: 4,
    progressionLength: 4,
    tempo: 110,
    waveform: "triangle",
    noteLengthBeats: 4,
    octave: 3,
    articulation: "normal",
    includeColor: true,
    preferCadence: true,
    uniqueChordsOnly: false,
    arpeggiate: false,
    arpLengthBeats: 0.25,
    humanize: false
  },
  progression: []
};

const form = document.querySelector("#generator-form");
const keyRootSelect = document.querySelector("#key-root");
const scaleTypeSelect = document.querySelector("#scale-type");
const chordSizeInput = document.querySelector("#chord-size");
const chordSizeValue = document.querySelector("#chord-size-value");
const progressionLengthInput = document.querySelector("#progression-length");
const progressionLengthValue = document.querySelector("#progression-length-value");
const tempoInput = document.querySelector("#tempo");
const tempoValue = document.querySelector("#tempo-value");
const waveformSelect = document.querySelector("#waveform");
const noteLengthInput = document.querySelector("#note-length");
const noteLengthValue = document.querySelector("#note-length-value");
const arpLengthInput = document.querySelector("#arp-length");
const octaveInput = document.querySelector("#octave");
const octaveValue = document.querySelector("#octave-value");
const articulationSelect = document.querySelector("#articulation");
const includeColorInput = document.querySelector("#include-color");
const preferCadenceInput = document.querySelector("#prefer-cadence");
const uniqueChordsInput = document.querySelector("#unique-chords");
const arpeggiateInput = document.querySelector("#arpeggiate");
const humanizeInput = document.querySelector("#humanize");
const progressionList = document.querySelector("#progression-list");
const progressionMeta = document.querySelector("#progression-meta");
const analysisCopy = document.querySelector("#analysis-copy");
const playButton = document.querySelector("#play-progression");
const stopButton = document.querySelector("#stop-playback");
const downloadButton = document.querySelector("#download-midi");

let audioContext;
const activeOscillators = new Set();
let hasGeneratedProgression = false;

populateKeys();
populateScaleTypes();
syncOutputs();
generateAndRender();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  state.settings = getSettingsFromForm();
  generateAndRender();
});

[chordSizeInput, progressionLengthInput, tempoInput, noteLengthInput, octaveInput].forEach((input) => {
  input.addEventListener("input", () => {
    syncOutputs();
    state.settings = getSettingsFromForm();
  });
});

[
  keyRootSelect,
  scaleTypeSelect,
  waveformSelect,
  articulationSelect,
  includeColorInput,
  preferCadenceInput,
  uniqueChordsInput,
  arpeggiateInput,
  arpLengthInput,
  humanizeInput
].forEach((input) => {
  input.addEventListener("change", () => {
    state.settings = getSettingsFromForm();
  });
});

playButton.addEventListener("click", () => {
  if (!state.progression.length) {
    return;
  }

  stopPlayback();
  playProgression(
    state.progression,
    state.settings.tempo,
    state.settings.noteLengthBeats,
    state.settings.waveform,
    state.settings
  );
});

stopButton.addEventListener("click", () => {
  stopPlayback();
});

downloadButton.addEventListener("click", () => {
  if (!state.progression.length) {
    return;
  }

  const midiBytes = buildMidiFile(state.progression, state.settings.tempo);
  const blob = new Blob([midiBytes], { type: "audio/midi" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const keyLabel = NOTE_NAMES[state.settings.keyRoot].short;
  const exportDate = new Date().toISOString().slice(0, 10);
  const optionFlags = [
    state.settings.articulation,
    state.settings.arpeggiate ? `arp${formatArpDivision(state.settings.arpLengthBeats)}` : "block",
    state.settings.humanize ? "human" : "quantized"
  ].join("-");
  anchor.href = url;
  anchor.download = `${keyLabel}-${state.settings.scaleType}-${state.settings.tempo}bpm-${state.settings.noteLengthBeats}beats-oct${state.settings.octave}-${optionFlags}-${exportDate}.mid`;
  anchor.click();
  URL.revokeObjectURL(url);
});

function populateKeys() {
  keyRootSelect.innerHTML = NOTE_NAMES.map(
    (note, index) => `<option value="${index}">${note.label}</option>`
  ).join("");
}

function populateScaleTypes() {
  scaleTypeSelect.innerHTML = Object.entries(SCALES).map(
    ([value, scale]) => `<option value="${value}">${scale.label}</option>`
  ).join("");
  scaleTypeSelect.value = state.settings.scaleType;
}

function syncOutputs() {
  chordSizeValue.textContent = `${chordSizeInput.value} notes`;
  progressionLengthValue.textContent = `${progressionLengthInput.value} chords`;
  tempoValue.textContent = `${tempoInput.value} BPM`;
  noteLengthValue.textContent = `${noteLengthInput.value} ${Number(noteLengthInput.value) === 1 ? "beat" : "beats"}`;
  octaveValue.textContent = `Octave ${octaveInput.value}`;
}

function getSettingsFromForm() {
  return {
    keyRoot: Number(keyRootSelect.value),
    scaleType: scaleTypeSelect.value,
    chordSize: Number(chordSizeInput.value),
    progressionLength: Number(progressionLengthInput.value),
    tempo: Number(tempoInput.value),
    waveform: waveformSelect.value,
    noteLengthBeats: Number(noteLengthInput.value),
    arpLengthBeats: Number(arpLengthInput.value),
    octave: Number(octaveInput.value),
    articulation: articulationSelect.value,
    includeColor: includeColorInput.checked,
    preferCadence: preferCadenceInput.checked,
    uniqueChordsOnly: uniqueChordsInput.checked,
    arpeggiate: arpeggiateInput.checked,
    humanize: humanizeInput.checked
  };
}

function generateAndRender() {
  stopPlayback();
  state.progression = generateProgression(state.settings);
  hasGeneratedProgression = true;
  renderProgression();
}

function generateProgression(settings) {
  const pool = buildChordPool(settings);
  const tonicPool = pool.filter((chord) => chord.functionGroup === "tonic");
  const dominantPool = pool.filter((chord) => chord.functionGroup === "dominant");
  const progression = [];
  const usedChordIds = new Set();

  for (let index = 0; index < settings.progressionLength; index += 1) {
    const previousChord = progression[index - 1];
    const isPenultimate = index === settings.progressionLength - 2;
    const shouldEnd = index === settings.progressionLength - 1;
    let candidates = chooseCandidates(pool, previousChord, shouldEnd, settings);

    if (!candidates.length) {
      candidates = pool;
    }

    if (!previousChord && tonicPool.length) {
      candidates = tonicPool;
    }

    if (settings.preferCadence && isPenultimate && dominantPool.length) {
      candidates = dominantPool;
    }

    if (shouldEnd && tonicPool.length) {
      candidates = tonicPool;
    }

    if (settings.uniqueChordsOnly) {
      const unusedCandidates = candidates.filter((chord) => !usedChordIds.has(chord.id));
      if (unusedCandidates.length) {
        candidates = unusedCandidates;
      }
    }

    const chosen = weightedPick(candidates);
    progression.push(chosen);
    usedChordIds.add(chosen.id);
  }

  return smoothVoiceLeading(progression, settings.chordSize, settings.octave);
}

function chooseCandidates(pool, previousChord, shouldEnd, settings) {
  if (!previousChord) {
    return pool.filter((chord) => chord.functionGroup === "tonic");
  }

  if (shouldEnd && settings.preferCadence) {
    return pool.filter((chord) => chord.functionGroup === "tonic");
  }

  const transitions = {
    tonic: ["preDominant", "dominant", "color"],
    preDominant: ["dominant", "color"],
    dominant: ["tonic", "color", "approach"],
    color: ["tonic", "preDominant", "dominant"],
    approach: ["dominant", "tonic"]
  };

  const allowedTargets = transitions[previousChord.functionGroup] ?? ["tonic", "dominant", "color"];
  return pool.filter((chord) => allowedTargets.includes(chord.functionGroup));
}

function buildChordPool(settings) {
  const scale = getScalePitchClasses(settings.keyRoot, settings.scaleType);
  const parallelScaleType = SCALES[settings.scaleType].borrowFrom ?? "major";
  const parallelScale = getScalePitchClasses(settings.keyRoot, parallelScaleType);
  const pool = [];

  scale.forEach((pitchClass, degree) => {
    const stack = buildStackedScaleChord(scale, degree, settings.chordSize);
    const diatonicQuality = identifyQuality(stack);
    pool.push(createChordEntry({
      rootPc: pitchClass,
      qualityKey: pickExtendedQuality(diatonicQuality, settings.chordSize),
      source: "diatonic",
      degree,
      functionGroup: getFunctionForDegree(degree),
      description: `Built diatonically from degree ${DEGREE_NAMES[degree]} in ${NOTE_NAMES[settings.keyRoot].short} ${settings.scaleType}.`
    }));

    if (settings.chordSize >= 4) {
      const softened = degree === 0 || degree === 3
        ? settings.scaleType === "major" ? "maj9" : "min9"
        : null;

      if (softened) {
        pool.push(createChordEntry({
          rootPc: pitchClass,
          qualityKey: fitQualityToSize(softened, settings.chordSize),
          source: "extension",
          degree,
          functionGroup: getFunctionForDegree(degree),
          description: `An extended diatonic color chord adding upper tensions from the key.`
        }));
      }
    }
  });

  pool.push(
    createSuspendedChord(scale[4], 4, "sus4", "dominant", "A suspended dominant that delays the third for extra tension.", settings),
    createSuspendedChord(scale[4], 4, "sevenSus4", "dominant", "Dominant suspension with added upper color tones.", settings)
  );

  if (settings.includeColor) {
    parallelScale.forEach((pitchClass, degree) => {
      const stack = buildStackedScaleChord(parallelScale, degree, settings.chordSize);
      const quality = pickExtendedQuality(identifyQuality(stack), settings.chordSize);
      pool.push(createChordEntry({
        rootPc: pitchClass,
        qualityKey: quality,
        source: "borrowed",
        degree,
        functionGroup: degree === 3 || degree === 5 ? "preDominant" : "color",
        description: `Modal interchange borrowed from ${NOTE_NAMES[settings.keyRoot].short} ${parallelScaleType}.`
      }));
    });

    const targetDegrees = [1, 2, 3, 4, 5].filter((degree) => scale[degree] !== undefined);
    targetDegrees.forEach((degree) => {
      const targetRoot = scale[degree];
      const dominantRoot = mod(targetRoot + 7, 12);
      const diminishedRoot = mod(targetRoot - 1, 12);
      const alteredQuality = degree === 4 ? "sevenFlat9" : "dom7";

      pool.push(createChordEntry({
        rootPc: dominantRoot,
        qualityKey: fitQualityToSize(alteredQuality, settings.chordSize),
        source: "secondary-dominant",
        degree,
        functionGroup: "dominant",
        targetDegree: degree,
        description: `Secondary dominant pushing toward ${DEGREE_NAMES[degree]} in the home key.`
      }));

      pool.push(createChordEntry({
        rootPc: diminishedRoot,
        qualityKey: fitQualityToSize(settings.chordSize > 4 ? "dim7" : "halfDim7", settings.chordSize),
        source: "leading-tone",
        degree,
        functionGroup: "approach",
        targetDegree: degree,
        description: `Leading-tone diminished harmony approaching ${DEGREE_NAMES[degree]}.`
      }));
    });

    pool.push(
      createChordEntry({
        rootPc: mod(scale[4] + 7, 12),
        qualityKey: fitQualityToSize("sevenSharp9", settings.chordSize),
        source: "altered",
        degree: 4,
        functionGroup: "dominant",
        targetDegree: 4,
        description: "Altered dominant color that adds bite before the cadence."
      }),
      createChordEntry({
        rootPc: scale[1],
        qualityKey: fitQualityToSize(settings.scaleType === "major" ? "min11" : "halfDim7", settings.chordSize),
        source: "color",
        degree: 1,
        functionGroup: "preDominant",
        description: "A denser pre-dominant option to widen the harmonic motion."
      })
    );
  }

  return dedupePool(pool);
}

function createSuspendedChord(rootPc, degree, qualityKey, functionGroup, description, settings) {
  return createChordEntry({
    rootPc,
    qualityKey: fitQualityToSize(qualityKey, settings.chordSize),
    source: "suspension",
    degree,
    functionGroup,
    description
  });
}

function createChordEntry({
  rootPc,
  qualityKey,
  source,
  degree,
  functionGroup,
  description,
  targetDegree = null
}) {
  const quality = QUALITY_LIBRARY[qualityKey];
  return {
    id: `${rootPc}-${qualityKey}-${degree}-${source}-${targetDegree ?? "x"}`,
    rootPc,
    qualityKey,
    source,
    degree,
    functionGroup,
    description,
    targetDegree,
    intervals: quality.intervals
  };
}

function fitQualityToSize(qualityKey, chordSize) {
  const intervals = QUALITY_LIBRARY[qualityKey].intervals;

  if (intervals.length >= chordSize) {
    return qualityKey;
  }

  const compatible = Object.entries(QUALITY_LIBRARY).find(([, quality]) => {
    const sameFamily = quality.family === QUALITY_LIBRARY[qualityKey].family;
    return sameFamily && quality.intervals.length >= chordSize;
  });

  return compatible ? compatible[0] : qualityKey;
}

function pickExtendedQuality(baseQuality, chordSize) {
  if (chordSize <= 3) {
    return baseQuality;
  }

  const mapping = {
    triadMaj: chordSize >= 6 ? "maj13" : chordSize === 5 ? "maj9" : "maj7",
    triadMin: chordSize >= 6 ? "min11" : chordSize === 5 ? "min9" : "min7",
    triadDim: chordSize >= 5 ? "halfDim7" : "triadDim",
    triadAug: "maj7",
    maj7: chordSize >= 6 ? "maj13" : chordSize === 5 ? "maj9" : "maj7",
    dom7: chordSize >= 6 ? "dom13" : chordSize === 5 ? "dom9" : "dom7",
    min7: chordSize >= 6 ? "min11" : chordSize === 5 ? "min9" : "min7",
    halfDim7: "halfDim7"
  };

  return mapping[baseQuality] ?? baseQuality;
}

function buildStackedScaleChord(scale, degree, chordSize) {
  const noteCount = Math.max(chordSize, 4);
  const notes = [];

  for (let index = 0; index < noteCount; index += 1) {
    const scaleIndex = degree + index * 2;
    const octaveOffset = Math.floor(scaleIndex / scale.length) * 12;
    const pitchClass = scale[scaleIndex % scale.length];
    notes.push(pitchClass + octaveOffset);
  }

  return notes;
}

function identifyQuality(absoluteNotes) {
  const root = absoluteNotes[0];
  const intervals = absoluteNotes.slice(0, 4).map((note) => note - root);
  const compact = intervals.join(",");

  const qualityMap = {
    "0,4,7,11": "maj7",
    "0,4,7,10": "dom7",
    "0,3,7,10": "min7",
    "0,3,6,10": "halfDim7",
    "0,3,6,9": "dim7",
    "0,3,7,11": "minMaj7"
  };

  if (qualityMap[compact]) {
    return qualityMap[compact];
  }

  const triadCompact = absoluteNotes.slice(0, 3).map((note) => note - root).join(",");
  const triadMap = {
    "0,4,7": "triadMaj",
    "0,3,7": "triadMin",
    "0,3,6": "triadDim",
    "0,4,8": "triadAug"
  };

  return triadMap[triadCompact] ?? "triadMaj";
}

function getFunctionForDegree(degree) {
  if (degree === 0 || degree === 5) {
    return "tonic";
  }

  if (degree === 4 || degree === 6) {
    return "dominant";
  }

  return "preDominant";
}

function getScalePitchClasses(rootPc, scaleType) {
  return SCALES[scaleType].intervals.map((interval) => mod(rootPc + interval, 12));
}

function dedupePool(pool) {
  const seen = new Map();
  pool.forEach((chord) => {
    if (!seen.has(chord.id)) {
      seen.set(chord.id, chord);
    }
  });
  return [...seen.values()];
}

function weightedPick(candidates) {
  const weighted = candidates.map((candidate) => ({
    chord: candidate,
    weight: getWeight(candidate)
  }));
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  let cursor = Math.random() * total;

  for (const entry of weighted) {
    cursor -= entry.weight;
    if (cursor <= 0) {
      return entry.chord;
    }
  }

  return weighted[weighted.length - 1].chord;
}

function getWeight(chord) {
  const weightBySource = {
    diatonic: 5,
    extension: 4,
    suspension: 3,
    borrowed: 2.3,
    "secondary-dominant": 2.6,
    "leading-tone": 1.7,
    altered: 1.9,
    color: 2.2
  };

  return weightBySource[chord.source] ?? 1;
}

function smoothVoiceLeading(progression, chordSize, octave) {
  let previousMidi = null;

  return progression.map((chord, index) => {
    const notes = buildVoicing(chord.rootPc, chord.qualityKey, chordSize, previousMidi, octave);
    previousMidi = notes;
    return {
      ...chord,
      order: index + 1,
      midiNotes: notes,
      noteNames: notes.map((note) => midiToName(note))
    };
  });
}

function buildVoicing(rootPc, qualityKey, chordSize, previousMidi, octave) {
  const rootMidi = (octave + 1) * 12 + rootPc;
  const intervals = [...QUALITY_LIBRARY[qualityKey].intervals];

  while (intervals.length < chordSize) {
    intervals.push(intervals[intervals.length % Math.min(3, intervals.length)] + 12);
  }

  let notes = intervals.slice(0, chordSize).map((interval) => rootMidi + interval);

  if (previousMidi) {
    notes = notes.map((note, index) => {
      const target = previousMidi[Math.min(index, previousMidi.length - 1)];
      let candidate = note;

      while (candidate - target > 6) {
        candidate -= 12;
      }

      while (target - candidate > 6) {
        candidate += 12;
      }

      return candidate;
    });
  }

  notes.sort((a, b) => a - b);
  notes = spreadCluster(notes);

  const minimumMidi = octave * 12 + 12;
  const maximumMidi = minimumMidi + 36;

  while (notes[0] < minimumMidi) {
    notes = notes.map((note) => note + 12);
  }

  while (notes[notes.length - 1] > maximumMidi) {
    notes = notes.map((note) => note - 12);
  }

  notes = spreadCluster(notes);

  return notes;
}

function renderProgression() {
  if (!state.progression.length) {
    progressionList.innerHTML = "";
    return;
  }

  const keyName = `${NOTE_NAMES[state.settings.keyRoot].short} ${SCALES[state.settings.scaleType].label}`;
  const texture = state.settings.arpeggiate ? "arpeggiated" : "block chords";
  progressionMeta.textContent = `${keyName} • ${state.settings.progressionLength} chords • ${state.settings.chordSize} notes per chord • ${state.settings.tempo} BPM • ${texture}`;

  progressionList.innerHTML = state.progression.map((chord) => {
    const quality = QUALITY_LIBRARY[chord.qualityKey];
    const title = `${NOTE_NAMES[chord.rootPc].short}${quality.suffix}`;
    const harmonicTarget = chord.targetDegree !== null ? ` -> ${DEGREE_NAMES[chord.targetDegree]}` : "";

    return `
      <article class="chord-card">
        <div class="chord-topline">
          <div>
            <p class="chord-meta">Chord ${chord.order}</p>
            <h3 class="chord-name">${title}</h3>
          </div>
          <span class="analysis-tag">${FUNCTION_LABELS[chord.functionGroup]}${harmonicTarget}</span>
        </div>
        <p class="chord-description">${chord.description}</p>
        <div class="note-pills">
          ${chord.noteNames.map((note) => `<span>${note}</span>`).join("")}
        </div>
        <div class="card-actions">
          <button type="button" data-play-index="${chord.order - 1}">Play chord</button>
        </div>
      </article>
    `;
  }).join("");

  const analysisTags = state.progression
    .map((chord) => `<span class="analysis-tag">${NOTE_NAMES[chord.rootPc].short}${QUALITY_LIBRARY[chord.qualityKey].suffix}</span>`)
    .join("");

  analysisCopy.innerHTML = `
    This progression begins in a ${FUNCTION_LABELS[state.progression[0].functionGroup].toLowerCase()} space, moves through
    ${state.progression.slice(1).map((chord) => FUNCTION_LABELS[chord.functionGroup].toLowerCase()).join(", ")},
    and keeps the voicings close for smoother playback and cleaner MIDI clips.
      <div class="analysis-tags">${analysisTags}</div>
  `;

  progressionList.querySelectorAll("[data-play-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const chord = state.progression[Number(button.dataset.playIndex)];
      const isolatedPlan = buildPerformancePlan([chord], state.settings);
      playPerformancePlan(isolatedPlan, state.settings.waveform, state.settings.articulation);
    });
  });
}

function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function stopPlayback() {
  activeOscillators.forEach((oscillator) => {
    try {
      oscillator.stop();
    } catch {
      return;
    }
  });
  activeOscillators.clear();
}

function playChord(midiNotes, durationSeconds, startTime = 0, waveform = "triangle", velocities = [], articulation = "normal") {
  const context = ensureAudioContext();
  const now = context.currentTime + startTime;
  const profile = getArticulationProfile(articulation);

  midiNotes.forEach((midi, index) => {
    const frequency = midiToFrequency(midi);
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = waveform;
    oscillator.frequency.value = frequency;

    const velocityScale = (velocities[index] ?? 96) / 127;
    const peakGain = getVoiceGain(waveform, index) * velocityScale;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(peakGain * profile.sustainLevel, now + durationSeconds * profile.decayPoint);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    oscillator.connect(gain);
    gain.connect(context.destination);
    activeOscillators.add(oscillator);
    oscillator.onended = () => {
      activeOscillators.delete(oscillator);
      oscillator.disconnect();
      gain.disconnect();
    };
    oscillator.start(now);
    oscillator.stop(now + durationSeconds + 0.04);
  });
}

function playProgression(progression, tempo, noteLengthBeats, waveform, settings) {
  const performancePlan = buildPerformancePlan(progression, settings);
  playPerformancePlan(performancePlan, waveform, settings.articulation);
}

function buildMidiFile(progression, tempo) {
  const header = [
    0x4d, 0x54, 0x68, 0x64,
    0x00, 0x00, 0x00, 0x06,
    0x00, 0x00,
    0x00, 0x01,
    0x01, 0xe0
  ];

  const trackEvents = [];
  const microsecondsPerQuarter = Math.floor(60000000 / tempo);
  const performancePlan = buildPerformancePlan(progression, state.settings);

  trackEvents.push(0x00, 0xff, 0x51, 0x03,
    (microsecondsPerQuarter >> 16) & 0xff,
    (microsecondsPerQuarter >> 8) & 0xff,
    microsecondsPerQuarter & 0xff);

  appendMidiEvents(trackEvents, performancePlan);

  trackEvents.push(0x00, 0xff, 0x2f, 0x00);

  const trackLength = trackEvents.length;
  const trackHeader = [
    0x4d, 0x54, 0x72, 0x6b,
    (trackLength >> 24) & 0xff,
    (trackLength >> 16) & 0xff,
    (trackLength >> 8) & 0xff,
    trackLength & 0xff
  ];

  return new Uint8Array([...header, ...trackHeader, ...trackEvents]);
}

function encodeVariableLength(value) {
  let buffer = value & 0x7f;
  const bytes = [];

  while ((value >>= 7)) {
    buffer <<= 8;
    buffer |= (value & 0x7f) | 0x80;
  }

  while (true) {
    bytes.push(buffer & 0xff);
    if (buffer & 0x80) {
      buffer >>= 8;
    } else {
      break;
    }
  }

  return bytes;
}

function getNoteDurationSeconds(tempo, noteLengthBeats) {
  return (60 / tempo) * noteLengthBeats;
}

function buildPerformancePlan(progression, settings) {
  const noteLengthBeats = settings.noteLengthBeats;
  const gate = getArticulationProfile(settings.articulation).gate;
  const humanizeWindow = settings.humanize ? Math.min(0.045, getNoteDurationSeconds(settings.tempo, noteLengthBeats) * 0.035) : 0;
  const events = [];

  progression.forEach((chord, chordIndex) => {
    const chordStartSeconds = chordIndex * getNoteDurationSeconds(settings.tempo, noteLengthBeats);
    const chordStartTicks = chordIndex * noteLengthBeats * 480;
    const stepBeats = settings.arpeggiate ? getArpeggioStepBeats(chord.midiNotes.length, settings.arpLengthBeats) : 0;

    chord.midiNotes.forEach((note, noteIndex) => {
      const noteStartSeconds = chordStartSeconds + (stepBeats * noteIndex * 60) / settings.tempo;
      const noteStartTicks = chordStartTicks + Math.round(stepBeats * noteIndex * 480);
      const randomizedOffset = humanizeWindow ? randomBetween(-humanizeWindow, humanizeWindow) : 0;
      const randomizedTickOffset = humanizeWindow ? Math.round((randomizedOffset * settings.tempo * 480) / 60) : 0;
      const durationSeconds = getNoteDurationSeconds(settings.tempo, noteLengthBeats) * gate;
      const durationTicks = Math.max(60, Math.round(noteLengthBeats * 480 * gate));
      const velocity = clamp(
        settings.humanize ? 84 + Math.round(randomBetween(-12, 12)) : 92 - noteIndex * 4,
        30,
        118
      );

      events.push({
        startSeconds: Math.max(0, noteStartSeconds + randomizedOffset),
        durationSeconds,
        startTicks: Math.max(0, noteStartTicks + randomizedTickOffset),
        durationTicks,
        note,
        velocity
      });
    });
  });

  events.sort((left, right) => {
    if (left.startTicks !== right.startTicks) {
      return left.startTicks - right.startTicks;
    }
    return left.note - right.note;
  });

  return events;
}

function playPerformancePlan(events, waveform, articulation = "normal") {
  const grouped = new Map();

  events.forEach((event) => {
    const key = `${event.startSeconds.toFixed(3)}-${event.durationSeconds.toFixed(3)}`;
    const group = grouped.get(key) ?? { startSeconds: event.startSeconds, durationSeconds: event.durationSeconds, notes: [], velocities: [] };
    group.notes.push(event.note);
    group.velocities.push(event.velocity);
    grouped.set(key, group);
  });

  [...grouped.values()].forEach((group) => {
    playChord(group.notes, group.durationSeconds, group.startSeconds, waveform, group.velocities, articulation);
  });
}

function appendMidiEvents(trackEvents, events) {
  const midiEvents = [];

  events.forEach((event) => {
    midiEvents.push({ tick: event.startTicks, type: "on", note: event.note, velocity: event.velocity });
    midiEvents.push({ tick: event.startTicks + event.durationTicks, type: "off", note: event.note, velocity: 0 });
  });

  midiEvents.sort((left, right) => {
    if (left.tick !== right.tick) {
      return left.tick - right.tick;
    }
    if (left.type !== right.type) {
      return left.type === "off" ? -1 : 1;
    }
    return left.note - right.note;
  });

  let previousTick = 0;

  midiEvents.forEach((event) => {
    const delta = Math.max(0, event.tick - previousTick);
    trackEvents.push(...encodeVariableLength(delta), event.type === "on" ? 0x90 : 0x80, event.note, event.velocity);
    previousTick = event.tick;
  });
}

function getArticulationProfile(articulation) {
  const articulationMap = {
    normal: {
      gate: 0.99,
      decayPoint: 0.82,
      sustainLevel: 0.7
    },
    staccato: {
      gate: 0.42,
      decayPoint: 0.35,
      sustainLevel: 0.32
    },
    sustain: {
      gate: 1.12,
      decayPoint: 0.92,
      sustainLevel: 0.82
    }
  };
  return articulationMap[articulation] ?? articulationMap.normal;
}

function getArpeggioStepBeats(noteCount, arpLengthBeats) {
  if (noteCount <= 1) {
    return 0;
  }

  return arpLengthBeats / (noteCount - 1);
}

function formatArpDivision(arpLengthBeats) {
  const divisionMap = {
    1: "1-4",
    0.5: "1-8",
    0.25: "1-16",
    0.125: "1-32"
  };

  return divisionMap[arpLengthBeats] ?? arpLengthBeats;
}

function spreadCluster(notes) {
  const spread = [...notes].sort((left, right) => left - right);

  for (let index = 1; index < spread.length; index += 1) {
    while (spread[index] <= spread[index - 1]) {
      spread[index] += 12;
    }
  }

  return spread;
}

function getVoiceGain(waveform, index) {
  const baseByWaveform = {
    sine: 0.13,
    triangle: 0.16,
    sawtooth: 0.1
  };
  return (baseByWaveform[waveform] ?? 0.14) / (index + 0.8);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function midiToFrequency(midi) {
  return 440 * (2 ** ((midi - 69) / 12));
}

function midiToName(midi) {
  const pitchClass = mod(midi, 12);
  const octave = Math.floor(midi / 12) - 1;
  return `${NOTE_NAMES[pitchClass].short}${octave}`;
}

function mod(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}
