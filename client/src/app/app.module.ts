import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { DynamicResizerDirective } from './dynamic-resizer.directive';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    DynamicResizerDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
