import 'normalize.css';
import '@fontsource/roboto';
import './index.tsx';

window.addEventListener('load', async () => {
  if (navigator.serviceWorker) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (error) {
      console.log('Service Worker register fail');
    }
  }
});
