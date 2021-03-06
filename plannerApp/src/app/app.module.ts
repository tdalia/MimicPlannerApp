import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';  // plugin
import interactionPlugin from '@fullcalendar/interaction';  // plugin
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timeGrid';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { NoteItemComponent } from './notes/note-item/note-item.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { ToDosComponent } from './to-dos/to-dos.component';
import { ToDoItemComponent } from './to-dos/todo-item/todo-item.component';
import { CreateToDoComponent } from './create-todo/create-todo.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete'

import { CalendarComponent } from './calendar/calendar.component';
import { ViewNoteComponent } from './dialogs/view-note/view-note.component';
import { ViewTodoComponent } from './dialogs/view-todo/view-todo.component';

import { GoogleSigninComponent } from './google.signin';
import { LogoutComponent } from './logout/logout.component';

// Register FullCalendar plugins
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    NotesComponent,
    NoteItemComponent,
    CreateNoteComponent,
    ToDosComponent,
    ToDoItemComponent,
    CreateToDoComponent,
    CalendarComponent,
    ViewNoteComponent,
    ViewTodoComponent,
    GoogleSigninComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDialogModule,
    FullCalendarModule,
    HttpClientModule,
    MatSnackBarModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ViewNoteComponent]
})
export class AppModule { }
