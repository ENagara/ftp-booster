import * as Sentry from '@sentry/browser';
import Constants from 'expo-constants';
import { Integrations } from "@sentry/tracing";

export const sentryInit = () => {
    Sentry.init({
        dsn: 'YourSentryProjectDSN',
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0,
        release: Constants.manifest.revisionId || "DEV",
        debug: __DEV__,
    });
}
