# Connector - terafoundation_kafka_connector

To install from the root of your terafoundation based service.

```
npm install terascope/terafoundation_kafka_connector
```

# Description

Terafoundation connector for Kafka producer and consumer clients.

This connector exposes two different client implementations. One for producers `type: producer` and one for consumers `type: consumer`.

# Parameters

| Name | Description | Default | Required |
| ---- | ----------- | ------- | -------- |
| type | What type of connector is required. "consumer" or "producer". | consumer | N |
| brokers | List of kafka brokers to use | localhost:9092 | N |
| group | Consumer group to join. Only applies to type: consumer | | Y for consumer |


# Configuration example

```
terafoundation:
    connectors:
        kafka:
            my_kafka:
                brokers: "localhost:9092"
```
