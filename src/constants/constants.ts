export const authKey: string = "Authentication";

export const routes = {
  auth: "/auth",
  app: "/app",
};

export const unAuthRoutes = {
  login: `${routes.auth}/login`,
  register: `${routes.auth}/register`,
};

export const authRoutes = {
  dashboard: `${routes.app}/login`,
  profile: `${routes.app}/register`,
};
