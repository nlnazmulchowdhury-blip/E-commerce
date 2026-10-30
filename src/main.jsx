import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { BannerProvider } from './context/BannerContext.jsx';
import { CatalogProvider } from './context/CatalogContext.jsx';
import { SocialProvider } from './context/SocialContext.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';
import { ShopProvider } from './context/ShopContext.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BannerProvider>
        <SocialProvider>
          <CatalogProvider>
            <SettingsProvider>
              <ShopProvider>
                <App />
              </ShopProvider>
            </SettingsProvider>
          </CatalogProvider>
        </SocialProvider>
      </BannerProvider>
    </BrowserRouter>
  </StrictMode>,
);
