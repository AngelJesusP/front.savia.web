// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
// })

// export default ({ mode }) => {
//   // Load app-level env vars to node-level env vars.
//   process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

//   return defineConfig({
//     plugins: [react()],
//     esbuild: {
//       logOverride: { 'this-is-undefined-in-esm': 'silent' }
//     }
//     // To access env vars here use process.env.TEST_VAR
//   });
// }


import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'


export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
    // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

    return defineConfig({
        plugins: [react()],

        server: {
            port: 1,
        },
    });
}