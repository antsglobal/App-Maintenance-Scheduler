import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentConfig } from 'src/environments/environment-config.interface';
import { ENV_CONFIG } from '../../environments/environment-config.interface';



// http.module.ts
@NgModule({
  imports: [CommonModule]
})
export class HttpModule {
  static forRoot(config: EnvironmentConfig): ModuleWithProviders<HttpModule> {
    return {
      ngModule: HttpModule,
      providers: [
        {
          provide: ENV_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
