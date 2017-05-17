# Description

Terafoundation connector for Kafka producer and consumer clients.

This connector exposes two different client implementations. One for producers `type: producer` and one for consumers `type: consumer`.

# Parameters

## `type: producer` parameters

| Name | Description | Default |
| ---- | ----------- | ------- |
| brokers | List of kafka brokers to use | localhost:9092 |

## `type: consumer` parameters

| Name | Description | Default |
| ---- | ----------- | ------- |
| brokers | List of kafka brokers to use | localhost:9092 |

# Configuration example

```
terafoundation:
    connectors:
        kafka:
            producer1:
                type: producer
                brokers:
                    - "localhost:9092"
            consumer1:
                type: consumer
                brokers:
                    - "localhost:9092"

```
