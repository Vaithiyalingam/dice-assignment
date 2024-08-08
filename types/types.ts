export interface Repository {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    language: string;
    owner: {
      avatar_url: string;
      login: string;
    };
    created_at: string;
    updated_at: string;
  }