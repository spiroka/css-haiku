import { defineConfig } from 'vite';
import prism from 'vite-plugin-prismjs';

export default defineConfig({
  plugins: [
    prism({
      languages: ['css'],
      theme: 'tomorrow'
    })
  ]
});
