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
| brokers | List of kafka brokers to use | localhost:9092 | N |
| options | Consumer group to join. Only applies to type: consumer | see below | Y |
| topic_options | librdkafka defined settings that apply per topic. | {} | N |
| rdkafka_options | librdkafka defined settings that are not subscription specific. | {} | N |

The `options` object enables setting a few properties

| type | What type of connector is required. "consumer" or "producer". | consumer | N |
| group | For type = 'consumer' what consumer group to use | terafoundation_kafka_connector | N |
| poll_interval | For type = 'producer', how often (in milliseconds) the producer connection is polled to keep it alive. | 100 | N |

# Connector configuration example

```
{
    options: {
        type: "consumer",
        group: opConfig.group
    },
    topic_options: {
        'enable.auto.commit': false
    },
    rdkafka_options: {
        'fetch.min.bytes': 100000
    }
}
```

# Terafoundation configuration example

```
terafoundation:
    connectors:
        kafka:
            my_kafka:
                brokers: "localhost:9092"
```
