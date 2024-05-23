import { Options, Scenario } from 'k6/options';
import { getSummaryRes, registrant_thresholds, setUseRandomWaitTime } from './utilities';
export { RegistrantAnonymousRegistration, RegistrantExistingProfileRegistration, RegistrantNewRegistration } from './registrant-portal-scripts';
export { ResponderExistingRegistration, ResponderNewRegistration } from './responder-portal-scripts';

const STAGE_DURATION = '10m';
let TARGET_VUS = parseInt(__ENV.VUS || "1");
if (TARGET_VUS > 100) TARGET_VUS == 100;

let ramp_up_scenario: Scenario = {
    executor: 'ramping-vus',
    startVUs: 1,
    stages: [
        { duration: '10s', target: TARGET_VUS }, //target should be <= MAX_VU
        { duration: STAGE_DURATION, target: TARGET_VUS },
    ],
    gracefulRampDown: '5m',
    gracefulStop: '5m'
}

export const options: Options = {
    scenarios: {
        newRegistration: {
            exec: 'RegistrantNewRegistration',
            ...ramp_up_scenario
        },
    },

    thresholds: {
        ...registrant_thresholds,
    }
};

// setUseRandomWaitTime(true);

const TEST_TYPE = "step-test";

export function handleSummary(data: any) {
    return getSummaryRes(TEST_TYPE, data);
}