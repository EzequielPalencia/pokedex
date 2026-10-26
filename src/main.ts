import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { config } from '@fortawesome/fontawesome-svg-core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Evita que FontAwesome inyecte una etiqueta <style> en tiempo de ejecución
// (sería bloqueada por el CSP style-src 'self'); sus estilos se cargan desde styles.scss.
config.autoAddCss = false;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
