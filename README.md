## Dependency

* Consul
```
consul agent -dev
```

## Requirement Components

* @nestcloud/common
* @nestcloud/core
* @nestcloud/consul
* @nestcloud/consul-service
* @nestcloud/consul-loadbalance
* @nestcloud/grpc

## How to run

```bash
yarn
yarn run start:server1
yarn run start:server2
yarn run start:client
```

Then visit http://localhost:3004/docs
