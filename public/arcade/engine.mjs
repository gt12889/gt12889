export const phases = ['PLAN', 'BUILD', 'CHECK', 'SHIP'];
const durations = [3, 13, 4, 3];

export class Workshop {
  constructor(count, random = Math.random) {
    if (!Number.isInteger(count) || count < 1) throw new Error('A project is required');
    this.count = count;
    this.random = random;
    this.deck = [];
    this.index = -1;
    this.phase = 0;
    this.progress = 0;
    this.time = 0;
    this.built = 0;
    this.assists = 0;
    this.discovered = new Set();
    this.paused = false;
    this.joined = false;
    this.leader = 'both';
    this.player = { x: 0.5, y: 0, vy: 0, walking: false, facing: 1 };
    this.cooldown = 0;
    this.spark = 0;
    this.bug = false;
    this.bugTime = 0;
    this.hadBug = false;
    this.next();
  }

  next() {
    if (!this.deck.length) {
      this.deck = Array.from({ length: this.count }, (_, i) => i);
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(this.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
      if (this.count > 1 && this.deck.at(-1) === this.index) {
        [this.deck[0], this.deck[this.deck.length - 1]] = [this.deck.at(-1), this.deck[0]];
      }
    }
    this.select(this.deck.pop());
  }

  select(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.count) return false;
    this.index = index;
    this.phase = 0;
    this.progress = 0;
    this.bug = false;
    this.bugTime = 0;
    this.hadBug = false;
    this.spark = 0;
    return true;
  }

  assist() {
    if (this.paused || this.cooldown > 0 || this.phase === 3) return false;
    this.cooldown = 0.55;
    this.spark = 1;
    this.assists++;
    if (this.bug) {
      this.bug = false;
      this.bugTime = 0;
    } else {
      this.progress = Math.min(1, this.progress + 0.12);
    }
    return true;
  }

  jump() {
    if (!this.joined || this.paused || this.player.y > 0) return false;
    this.player.vy = 330;
    return true;
  }

  tick(elapsed, input = {}) {
    if (this.paused || !Number.isFinite(elapsed) || elapsed <= 0) return;
    const dt = Math.min(elapsed, 0.1);
    this.time += dt;
    this.cooldown = Math.max(0, this.cooldown - dt);
    this.spark = Math.max(0, this.spark - dt * 2);
    const p = this.player;
    const movement = this.joined ? ((input.right ? 1 : 0) - (input.left ? 1 : 0)) : 0;
    p.walking = movement !== 0;
    if (movement) {
      p.facing = movement;
      p.x = Math.max(0.08, Math.min(0.92, p.x + movement * dt * (input.run ? 0.45 : 0.25)));
    }
    if (p.y > 0 || p.vy > 0) {
      p.vy -= 900 * dt;
      p.y = Math.max(0, p.y + p.vy * dt);
      if (!p.y) p.vy = 0;
    }
    if (this.bug) {
      this.bugTime += dt;
      if (this.bugTime >= 3.5) this.bug = false;
      return;
    }
    this.progress += dt / durations[this.phase];
    if (this.phase === 1 && this.progress >= 0.52 && !this.hadBug) {
      this.hadBug = true;
      this.bug = true;
    }
    if (this.progress >= 1) {
      this.progress = 0;
      if (this.phase === 3) {
        this.next();
      } else {
        this.phase++;
        if (this.phase === 3) {
          this.built++;
          this.discovered.add(this.index);
        }
      }
    }
  }

  get completion() { return this.phase >= 2 ? 1 : this.phase === 0 ? this.progress * 0.12 : 0.12 + this.progress * 0.88; }
  get phaseName() { return phases[this.phase]; }
}
