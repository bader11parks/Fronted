type ReadyFn = () => void;

let ready = false;
const q: ReadyFn[] = [];

export function whenPixelsReady(fn: ReadyFn) {
  if (ready) fn();
  else q.push(fn);
}

export function markPixelsReady() {
  ready = true;
  while (q.length) {
    const fn = q.shift();
    fn?.();
  }
}

export function newEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
