## Dependency

* Consul
```
consul agent -dev
```

## Config

``server1/config.yaml``
```yaml
consul:
  host: localhost
  port: 8500
service:
  discoveryHost: localhost
  healthCheck:
    timeout: 1s
    interval: 10s
    tcp: ${{ service.discoveryHost }}:${{ service.port }}
  maxRetry: 5
  retryInterval: 5000
  name: rpc-server
  port: 50053


database:
  postgres:
    type: postgres
    host: localhost
    port: 5432
    username: nest
    password: nest
    database: nest
    synchronize: true
```

## How to run

```bash
yarn
yarn run start:server1
yarn run start:server2
yarn run start:client
```

Then visit http://localhost:3004/docs
