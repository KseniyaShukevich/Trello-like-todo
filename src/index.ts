import 'normalize.css';
import '@fontsource/roboto';
import './scripts/index.tsx';

window.addEventListener('load', async () => {
  if (navigator.serviceWorker) {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js');
      console.log('Service Worker register success', reg);
    } catch (error) {
      console.log('Service Worker register fail');
    }
  }
});
