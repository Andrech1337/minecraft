import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EditorComponent } from './editor/editor.component';

export const routes: Routes = [
  { path: 'editor', component: EditorComponent },
  { path: '**', component: MainComponent },
];
