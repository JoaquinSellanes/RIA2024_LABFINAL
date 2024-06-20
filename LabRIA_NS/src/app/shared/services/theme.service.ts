import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey = 'selectedTheme';

  constructor() {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }

  setTheme(theme: 'winter' | 'night' | string): void {
    if (theme === 'winter' || theme === 'night') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.themeKey, theme);
    } else {
      console.error('Invalid theme:', theme);
    }
  }

  getTheme(): 'winter' | 'night' {
    return (localStorage.getItem(this.themeKey) as 'winter' | 'night') || 'winter';
  }

  toggleTheme(): void {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'winter' ? 'night' : 'winter';
    this.setTheme(newTheme);
  }

  isNightTheme(): boolean {
    return this.getTheme() === 'night';
  }
}
