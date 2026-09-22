# Tuan’s Build Lab

A playable showcase of six of Tuan’s public repositories. The profile README displays an animated GIF; clicking it opens the actual game at **https://gt12889.github.io/gt12889/arcade/**. The existing React portfolio is at the site root.

Inspired by [ChetasLua’s playable GitHub overview](https://x.com/chetaslua/status/2101964859932062067). This is an original implementation with original procedural artwork; no source code, sprites, or personal artwork were copied from that project. The characters are independent, fan-made representations with no OpenAI or Anthropic affiliation.

## Play

- Watch six project illustrations rotate through plan, build, check, and ship stages.
- Click the scene or **Help build** to advance progress or resolve a simulated bug.
- **Join the workshop** controls Tuan. Focus the scene, use arrows or A/D to move, Shift to run, Space to jump, and J to assist. Touch controls appear on small screens.
- Pick Claude or Codex to give that bot the lead-builder spotlight.
- Pick a project card to explore it, or use **Next project** for the next shuffled selection.
- Pause freezes the simulation. Reduced-motion preferences start it paused. Sound starts off and uses short, locally synthesized tones only when enabled.
- Build counts and explored repository IDs are stored locally in the visitor’s browser. Storage failure does not prevent play.

The builds, bugs, checks, and shipping are an illustration, not real code execution, validation of the showcased projects, AI requests, or commits. There are no analytics, API keys, external font requests, runtime GitHub calls, or application backends. Project descriptions come from public repository READMEs checked on September 22, 2026; the catalog does not assert that either agent authored those repositories.

## Develop

```sh
npm ci
npm run dev -- --host 127.0.0.1
# Open /arcade/ for the game; / for the existing portfolio.
npm test
npm run build
npm run preview:gif
```

The game can also be served by any static HTTP server. Its runtime uses only native browser modules and Canvas 2D. Vite copies `public/arcade/` into `dist/arcade/` without bundling it.

- `public/arcade/projects.mjs`: names, descriptions, repository links, colors, and scene types. Edit this catalog to feature other projects, then regenerate the README GIF.
- `public/arcade/engine.mjs`: deterministic, independently tested state machine, rotation, movement, jumps, assists, and scoring.
- `public/arcade/renderer.mjs`: responsive original canvas artwork shared by the browser and preview generator.
- `public/arcade/main.mjs`: accessible DOM controls, optional local progress, keyboard/touch input, and suspension when hidden or off screen.
- `scripts/render-preview.mjs`: creates `assets/build-lab.gif` using the same renderer with `@napi-rs/canvas` and `gifenc`. Development dependencies never ship to visitors.
- `tests/workshop.test.mjs`: completion, shuffle coverage, pause, assists, jump physics, catalog URLs, bounds, and time clamping.

## Deployment

The `Test and deploy portfolio` workflow builds and tests on pull requests, and deploys only pushes to `main` or manual runs from `main`. GitHub Pages must use **GitHub Actions** as its source. Only `dist/` is deployed. The deployment job alone has Pages and OIDC write permission.

No environment variables or paid hosting are needed. The README image links to the published `/gt12889/arcade/` path. GitHub Markdown strips executable scripts, so gameplay cannot run inside the README itself.
