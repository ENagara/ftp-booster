import * as Sentry from '@sentry/browser';
import Constants from 'expo-constants';
import { Integrations } from '@sentry/tracing';

export const sentryInit = () => {
    Sentry.init({
        dsn: Constants.manifest.extra.dsn,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0,
        release: Constants.manifest.version,
        environment: Constants.manifest.extra.environment
    });
}
