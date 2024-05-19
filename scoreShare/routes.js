//routes accesible to public. Not authentication required
export const publicRoutes = ["/", "/auth/new-verification"];

//routes used for authentication. Redirect logged user to profile
export const authRoutes = [
  "/auth/login",
  "/auth/login/api",
  "/auth/register",
  "/auth/register/api",
  "/auth/reset",
  "/auth/reset/api",
  "/auth/new-verification/api",
  "/auth/new-password",
  "/auth/new-password/api",
  "/auth/error",
];

//api authentication routes
export const apiAuthPrefix = "/api/auth";

//default url to redirect logged users
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
