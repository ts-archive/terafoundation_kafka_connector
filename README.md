# Description

Terafoundation connector for Kafka producer and consumer clients.

This connector exposes two different client implementations. One for producers `kafka_producer` and one for consumers `kafka_consumer`. 

# Parameters

## `kafka_producer` parameters

| Name | Description | Default |
| ---- | ----------- | ------- |
| brokers | List of kafka brokers to use | localhost:9092 |

## `kafka_consumer` parameters

| Name | Description | Default |
| ---- | ----------- | ------- |
| brokers | List of kafka brokers to use | localhost:9092 |

# Configuration example

```
terafoundation:
    connectors:
        kafka_producer:
            default:
                brokers:
                    - "localhost:9092"

```
