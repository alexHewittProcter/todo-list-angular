import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from 'src/environments/environment';
import { CustomNavbarModule } from './src/custom-navbar.module';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () =>
  platformBrowserDynamic().bootstrapModule(CustomNavbarModule, { ngZone: 'noop' });
bootstrap().catch((err) => console.error(err));
