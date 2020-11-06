---
title: "JMeter"
navTitle: "JMeter"
---

## JMeter

JMeter is open source software, a 100% pure Java application designed to load test functional behavior and measure performance.
It was originally designed for testing Web Applications but has since expanded to other test functions.
With our integration you can integrate the execution of JMeter load tests directly into your experiments.

[Read more about JMeter](https://jmeter.apache.org/usermanual/)

### Configuration

| Parameter   | Environment Variable   |      Description      | Default | Required |
|----------|-------------|-------------|-------------|-------------|
| Duration | DURATION | How long should the load test run? | inherited from experiment duration | no |
| Virtual Users | VUS | How many virtual users should be started? | 1 | yes |
| Target URL | TARGETURL | Which url should be the target for the load test? | - | yes |
| Docker Image | - |  Which image should be used for executing the action? |steadybit/action-jmeter:latest | yes |

### Usage

When you are using our default Docker image ('steadybit/action-JMeter:latest') then the following load test will be executed during the experiment:

```
import http from 'JMeter/http';
import { check, sleep } from 'JMeter';

export default function () {
    let response = http.get(`${__ENV.TARGETURL}`);
    check(response, { 'status was 200': r => r.status == 200 });
    sleep(1);
}
```

The `entrypoint.sh` script contains the other parameters which are necessary for running a JMeter load test:

```
#!/bin/bash
echo "Executing JMeter load test against target url ${TARGETURL} with duration ${DURATION} and ${VUS} VUs"
mkdir -p /var/mail
groupadd --non-unique --gid ${JMETER_GROUP_ID:-1000} jmeter
useradd  --non-unique --uid ${JMETER_USER_ID:-1000} --no-log-init --create-home --gid jmeter jmeter
chown jmeter:jmeter /jmeter
chown -R jmeter:jmeter /opt/apache-jmeter-*
protocol="$(echo $TARGETURL | grep :// | sed -e's,^\(.*://\).*,\1,g')"
url="$(echo ${TARGETURL/$protocol/})"
hostport="$(echo ${url/$user@/} | cut -d/ -f1)"
host="$(echo $hostport | sed -e 's,:.*,,g')"
port="$(echo $hostport | sed -e 's,^.*:,:,g' -e 's,.*:\([0-9]*\).*,\1,g' -e 's,[^0-9],,g')"
path="$(echo $url | grep / | cut -d/ -f2-)"
exec su-exec jmeter:jmeter jmeter --nongui --testfile default.jmx --logfile result.jtl -JTARGET_HOST=$host -JTARGET_PORT=$port -JTARGET_PATH=/$path -JDURATION=$DURATION -JVUS=$VUS
```

Of course it is also possible to store your own script or customize the `entrypoint.sh`. All you have to do is to provide your own Docker image, which contains the corresponding script:

```
# Inherit existing image
FROM steadybit/action-jmeter:latest

# provide custom test
COPY tests/default.jmx /jmeter/default.jmx

#optional
COPY entrypoint.sh /usr/local/bin/

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
```
