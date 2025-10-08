import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule
  ],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  protected currentLang: string = 'en';
  protected languages: Array<{code: string, label: string}> = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' }
  ];

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang;
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = language;
  }
}
