import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@fortawesome/fontawesome-svg-core']
  },
  env: {
    REACT_APP_BACKEND_URL: "https://pfpruebadl-production.up.railway.app/"
  }
});










// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['@fortawesome/fontawesome-svg-core'],
//   },
// });