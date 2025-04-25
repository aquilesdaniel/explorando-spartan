import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDark = false;

  constructor() {
    this.loadThemeFromStorage();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.updateTheme();
  }

  private updateTheme(): void {
    const root = document.documentElement;

    if (this.isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  private loadThemeFromStorage(): void {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
      this.isDark = true;
      document.documentElement.classList.add('dark');
    } else {
      this.isDark = false;
      document.documentElement.classList.remove('dark');
    }
  }

  get currentTheme(): boolean {
    return this.isDark;
  }
}
