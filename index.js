'use strict';

function create(config, logger) {
    logger.info("Setting up Kafka " + config.type + " with brokers: " + config.brokers);
    var Kafka = require("node-rdkafka");

    var client;

    if (config.type === "consumer") {
        client = new Kafka.KafkaConsumer({
            'group.id': config.group,
            'metadata.broker.list': config.brokers
        }, {
            // TODO: we'll want to expose some of these settings
            "auto.offset.reset": "smallest"
        });
    }
    else if (config.type === "producer") {
        client = new Kafka.Producer({
          'metadata.broker.list': config.brokers,
          'queue.buffering.max.messages': 500000,
          'queue.buffering.max.ms': 1000,
          'batch.num.messages': 100000,
        });

        // TODO: this should probably be configurable.
        client.setPollInterval(100);
    }

    // TODO: should this be here?
    client.connect({}, function(err) {
        if (err) {
            logger.error("Error connecting to Kafka: " + err);
            throw err;
        }
    });

    return {
        client: client
    }
}

function config_schema() {
    return {
        type: {
            doc: 'What type of connector is required. Defaults to "consumer".',
            default: 'consumer',
            format: ['consumer', 'producer']
        },
        brokers: {
            doc: 'List of seed brokers for the kafka environment',
            default: ["localhost:9092"],
            format: Array
        },
        group: {
            doc: 'Consumer group to join. Applies to type: consumer',
            default: "terafoundation",
            format: String
        }
    }
}

module.exports = {
    create: create,
    config_schema: config_schema
};