export const routeMatchers = {
  auth: ["/sign-in"],
  onboarding: ["/user-info", "/join-organization"],
  public: [
    "/",
    "/api/get-user",
    "/api/auth/signin",
    "/api/auth/callback/credentials",
    "/api/auth/signin/credentials",
    "/api/auth/signout",
    "/api/auth/signout",
    "/api/auth/session",
    "/api/auth/csrf",
    "/api/auth/providers",
  ],
};
