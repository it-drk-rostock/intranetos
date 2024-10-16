import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://76102526a0023f6b825cb55fb5414f2a@o4507447318413312.ingest.de.sentry.io/4508132199759952",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  enabled: process.env.NODE_ENV !== "development",
});
