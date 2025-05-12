import { defineConfig } from 'vite';
import prism from 'vite-plugin-prismjs';

export default defineConfig({
  plugins: [
    prism({
      languages: ['css'],
      theme: 'tomorrow'
    }),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(/%__APP_VERSION__%/g, process.env.npm_package_version);
      }
    }
  ]
});
