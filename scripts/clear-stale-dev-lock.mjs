import { existsSync, readFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const lockPath = join(process.cwd(), ".next/dev/lock");
if (!existsSync(lockPath)) process.exit(0);

let pid;
try {
  const info = JSON.parse(readFileSync(lockPath, "utf8"));
  pid = Number(info.pid);
} catch {
  unlinkSync(lockPath);
  process.exit(0);
}

if (!pid) {
  unlinkSync(lockPath);
  process.exit(0);
}

try {
  process.kill(pid, 0);
} catch {
  unlinkSync(lockPath);
}
