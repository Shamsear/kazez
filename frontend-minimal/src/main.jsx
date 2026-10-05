import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-500.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css';
import '@fontsource/ibm-plex-mono/400.css';
import './styles/tokens.css';
import './styles/base.css';

import { LocaleProvider } from './i18n/LocaleContext.jsx';
import { ShopProvider } from './state/ShopContext.jsx';
import { App } from './app/App.jsx';

document.documentElement.classList.add('js-reveal');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LocaleProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </LocaleProvider>
    </BrowserRouter>
  </React.StrictMode>
);
