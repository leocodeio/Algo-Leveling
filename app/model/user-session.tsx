export interface UserSession {
    id: string;
    access_token: string;
    lightOrDarkMode: "light" | "dark";
    language: string;
    CSRFToken: string;
    metrics: {
      lastLogin: Date;
      loginCount: number;
      [key: string]: any;
    };
    impersonatingFromUserId?: string;
  }
  