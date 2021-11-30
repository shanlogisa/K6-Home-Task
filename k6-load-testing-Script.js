import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
 
//Stages: ramping up/down VUs
stages: [
    { duration: '5s', target: 250 }, //simulate ramp-up of traffic from 1 to 250 users over 5 Seconds
    { duration: '5s', target: 500 }, //simulate ramp-up of traffic from 250 to 500 users over next 5 Seconds 
    { duration: '5s', target: 1000}, //simulate ramp-up of traffic from 500 to 1000 users over next 5 Seconds 
    { duration: '15s', target: 0 }, // ramp-down to 0 users over 15 seconds
  ],

//Thresholds: % of Errors Check and Req Duration

 thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    //http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1000ms
  },
 };

//Checks: Evaluating sucess of load test using checks for http reposnes code 200 and text check

export default function () {
//Loading Demo Webshop landing page  
const res = http.get('http://demowebshop.tricentis.com/');
  check(res, { 'status was 200': (r) => r.status == 200 ,'verify homepage text': (r) =>
      r.body.includes('Demo Web Shop'),});
  sleep(1);
}