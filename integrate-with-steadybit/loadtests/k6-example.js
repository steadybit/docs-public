import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
  scenarios: {
    default_test: {
      executor: 'constant-vus',
      vus: `${__ENV.VUS}`,
      duration: `${__ENV.DURATION}s`,
    },
  },
};

export default function () {
  let response = http.get(`${__ENV.TARGETURL}`);
  check(response, { 'status was 200': r => r.status == 200 });
  sleep(1);
}
