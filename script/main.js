import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 3,
};

export default function () {
  const url = `http://localhost:4000/api/v1/planets/analytics/100000`;

  const res = http.get(url);

  check(res, { "is status 200": (r) => r.status === 200 });

  sleep(0.3);
}
