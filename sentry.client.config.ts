import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://76102526a0023f6b825cb55fb5414f2a@o4507447318413312.ingest.de.sentry.io/4508132199759952",

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  enabled: process.env.NODE_ENV !== "development",
});
