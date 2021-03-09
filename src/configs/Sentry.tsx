import * as Sentry from '@sentry/browser';
import Constants from 'expo-constants';

export const sentryInit = () => {
    Sentry.init({
        dsn: "your sencry dsn here",
        enableInExpoDevelopment: true,
        debug: true,
        release: Constants.manifest.version,
        environment: Constants.manifest.extra.environment
    });
}
