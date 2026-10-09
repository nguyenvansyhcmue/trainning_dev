import { spawn } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const spawnOptions = { stdio: 'inherit', shell: process.platform === 'win32' };
const processes = [
  spawn(npmCommand, ['run', 'watch:students'], spawnOptions),
  spawn(npmCommand, ['start'], spawnOptions)
];

function stopAll() {
  for (const child of processes) {
    if (!child.killed) child.kill();
  }
}

process.on('SIGINT', () => { stopAll(); process.exit(0); });
process.on('SIGTERM', () => { stopAll(); process.exit(0); });
processes.forEach(child => child.on('exit', code => {
  if (code && code !== 0) { stopAll(); process.exit(code); }
}));
