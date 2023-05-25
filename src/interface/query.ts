export interface BaseInfo {
  self: any;
  githubUser: GithubUser;
  version: Version;
  codingStats: CodingStats;
}

export interface GithubUser {
  login: string;
  name: string;
  avatarURL: string;
  bio: string;
  email: any;
  location: any;
  htmlurl: string;
}

export interface Version {
  commit: string;
  goVersion: string;
  date: string;
}

export interface CodingStats {
  totalDuration: string;
  TotalSeconds: number;
  calculatedDays: number;
  languages: Language[];
}

export interface Language {
  language: string;
  total: number;
}
