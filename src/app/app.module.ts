import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './init/home/home/home.component';
import { PokemonSelectBoxComponent } from './components/pokemon-select-box/pokemon-select-box.component';
import { PokemonSearchBoxComponent } from './components/pokemon-search-box/pokemon-search-box.component';
import { PokemonInfoDisplayComponent } from './components/pokemon-info-display/pokemon-info-display.component';
import { FormsModule } from '@angular/forms';
import { SkillBarsComponent } from './components/skill-bars/skill-bars.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemonSelectBoxComponent,
    PokemonSearchBoxComponent,
    PokemonInfoDisplayComponent,
    SkillBarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
