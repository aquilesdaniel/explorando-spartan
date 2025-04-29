import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

interface GitHubProfile {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  html_url: string;
}

@Component({
  selector: 'app-profile',
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileName = '';
  profile: GitHubProfile | null = null;
  loading = false;

  private token = 'SEU_TOKEN_AQUI';

  constructor(private http: HttpClient) {}

  updateUser(event: Event) {
    const input = event.target as HTMLInputElement;
    this.profileName = input.value;
  }

  searchProfile() {
    if (!this.profileName) return;

    this.loading = true;

    const headers = new HttpHeaders({
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${this.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    });

    this.http
      .get<GitHubProfile>(`https://api.github.com/users/${this.profileName}`, {
        headers,
      })
      .subscribe({
        next: (data) => {
          this.profile = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar o perfil:', err);
          this.profile = null;
          this.loading = false;
        },
      });
  }
}
