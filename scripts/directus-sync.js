import { loadEnv } from 'vite';
import { spawn } from 'child_process';

const env = loadEnv('', process.cwd(), 'PUBLIC_');

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const action = process.argv[2]; // This will be either 'pull', 'push' or 'diff'

const args = [
    'npx', 'directus-sync@2.2.0', action,
    '--dump-path', './src/lib/directus-backend',
    '--directus-url', env.PUBLIC_DIRECTUS_URL,
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
