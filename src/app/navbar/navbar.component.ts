import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
})
export class NavbarComponent {
  themes = [
    'light',
    'dark',
    'abyss',
    'acid',
    'aqua',
    'autumn',
    'black',
    'bumblebee',
    'business',
    'caramellatte',
    'coffee',
    'corporate',
    'cmyk',
    'cupcake',
    'cyberpunk',
    'dim',
    'dracula',
    'emerald',
    'fantasy',
    'forest',
    'garden',
    'halloween',
    'lemonade',
    'lofi',
    'luxury',
    'night',
    'nord',
    'pastel',
    'retro',
    'silk',
    'sunset',
    'synthwave',
    'valentine',
    'wireframe',
    'winter',
  ];



  setTheme(theme: string | Event) {
    if (theme instanceof Event) {
      const select = theme.target as HTMLSelectElement;
      theme = select.value;
    }

    document.documentElement.setAttribute('data-theme', theme);
  }
}
