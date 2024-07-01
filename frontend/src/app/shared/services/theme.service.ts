import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey = 'selectedTheme';
  private readonly validThemes = ['winter', 'lofi', 'acid', 'dracula', 'dim'];

  constructor() {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme && this.isValidTheme(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('winter');
    }
  }

  setTheme(theme: string): void {
    if (this.isValidTheme(theme)) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.themeKey, theme);
    } else {
      console.error('Invalid theme:', theme);
    }
  }

  getTheme(): string {
    return localStorage.getItem(this.themeKey) || 'winter';
  }

  toggleTheme(): void {
    const currentTheme = this.getTheme();
    const currentIndex = this.validThemes.indexOf(currentTheme);
    const newIndex = (currentIndex + 1) % this.validThemes.length;
    this.setTheme(this.validThemes[newIndex]);
  }

  isNightTheme(): boolean {
    return this.getTheme() === 'acid' || this.getTheme() === 'dracula' || this.getTheme() === 'dim';
  }

  private isValidTheme(theme: string): boolean {
    return this.validThemes.includes(theme);
  }
}
