# Description

Terafoundation connector for Kafka producer and consumer clients.

This connector exposes two different client implementations. One for producers `type: producer` and one for consumers `type: consumer`.

# Parameters

| Name | Description | Default | Required |
| ---- | ----------- | ------- | -------- |
| type | What type of connector is required. "consumer" or "producer". | consumer | N |
| brokers | List of kafka brokers to use | localhost:9092 | N |
| group | Consumer group to join. Only applies to type: consumer | Y for consumer |


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
