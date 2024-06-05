import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { AuthService } from './auth/auth.service';

// Guards
import { AdminGuard } from './guards/admin.guard';
import { PanaderiaGuard } from './guards/panaderia.guard';
import { UserGuard } from './guards/user.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    AdminGuard,
    PanaderiaGuard,
    UserGuard,
    // Puedes agregar interceptores aquí si los tienes
    // { provide: HTTP_INTERCEPTORS, useClass: YourInterceptorClass, multi: true },
  ],
  exports: [
    // No es necesario exportar servicios o guards aquí
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
