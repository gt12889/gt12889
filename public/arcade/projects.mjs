// Curated from these public repository READMEs. No API keys or runtime requests.
export const profile = {
  name: 'Tuan Dinh',
  username: 'gt12889',
  github: 'https://github.com/gt12889',
};

export const projects = [
  {
    id: 'quill-win', name: 'Quill', kind: 'audio', color: '#dba782',
    tagline: 'Every voice. On your own machine.',
    description: 'A local Windows meeting recorder and transcriber. Microphone and system audio stay on separate tracks, with on-device Whisper transcription.',
    stack: ['Go', 'WASAPI', 'Whisper'],
    url: 'https://github.com/gt12889/quill-win',
    steps: ['Capture two audio tracks', 'Align the waveforms', 'Assemble the transcript', 'Keep everything local'],
  },
  {
    id: 'aleithia', name: 'Aleithia', kind: 'graph', color: '#8ed8b6',
    tagline: 'Connect the dots in a neighborhood.',
    description: 'Neighborhood intelligence for small businesses, connecting regulatory, market, and community signals through GPU inference and graph retrieval.',
    stack: ['Python', 'Modal', 'Graph-RAG'],
    url: 'https://github.com/gt12889/aleithia',
    steps: ['Gather neighborhood signals', 'Connect the knowledge graph', 'Trace the source documents', 'Assemble the briefing'],
  },
  {
    id: 'hacklytics2026', name: 'RxGuard', kind: 'search', color: '#a6b8ff',
    tagline: 'Find the evidence behind the answer.',
    description: 'A medication safety research project using semantic search over FDA adverse event reports. This game only illustrates document retrieval; it gives no medical results.',
    stack: ['FastAPI', 'React', 'Vector search'],
    url: 'https://github.com/gt12889/hacklytics2026',
    steps: ['Load the document fixtures', 'Encode a sample query', 'Retrieve source matches', 'Attach the citations'],
  },
  {
    id: 'aeronav', name: 'AeroNav', kind: 'flight', color: '#80c8e9',
    tagline: 'A flight path, a little more intelligent.',
    description: 'An aerospace simulation frontend with autonomous agents, canvas flight visualization, audio analysis, and service telemetry.',
    stack: ['TypeScript', 'Canvas', 'Simulation'],
    url: 'https://github.com/gt12889/aeronav',
    steps: ['Plot the waypoints', 'Coordinate the agents', 'Simulate the flight path', 'Render the telemetry'],
  },
  {
    id: 'tamuhack2026', name: 'Elder Strolls', kind: 'travel', color: '#e5c77c',
    tagline: 'A friendlier way through the airport.',
    description: 'Voice-first travel assistance for elderly passengers, with accessible flight management and a remote family helper interface.',
    stack: ['Next.js', 'Django', 'Voice AI'],
    url: 'https://github.com/gt12889/tamuhack2026',
    steps: ['Listen to the request', 'Find the itinerary', 'Connect the family helper', 'Guide the journey'],
  },
  {
    id: 'peacemap', name: 'PeaceMap', kind: 'map', color: '#d6a5dc',
    tagline: 'A wider view of a changing world.',
    description: 'A real-time conflict map project. The workshop uses an abstract, fictional map rather than live conflict data.',
    stack: ['TypeScript', 'Maps', 'Visualization'],
    url: 'https://github.com/gt12889/peacemap',
    steps: ['Draw the map layers', 'Place the sample signals', 'Connect the timeline', 'Render the overview'],
  },
];
