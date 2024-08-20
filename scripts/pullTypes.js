import { loadEnv } from 'vite';
import { spawn } from 'child_process';

const env = loadEnv('', process.cwd(), 'PUBLIC_');

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const args = [
    'indirectus',
    'sdk',
    'generate',
    '--fetch', 'true',
    '--dir', './src/lib/types',
    '--outputDir', './src/lib/types',
    '--url', env.PUBLIC_DIRECTUS_URL
];

const child = spawn(command, args, {
    stdio: 'inherit',
    shell: true
});

child.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});

child.on('close', (code) => {
    if (code !== 0) {
        console.error(`Child process exited with code ${code}`);
    }
});