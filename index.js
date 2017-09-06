'use strict';

function create(config, logger, settings) {
    logger.info("Setting up Kafka " + config.type + " with brokers: " + config.brokers);
    var Kafka = require("node-rdkafka");

    var client;

    // Group can be passed in when the connection is requested by the
    // application or configured in terafoundation config.
    var group = settings.options.group;
    if (! group) group = config.group;

    var autocommit = settings.options.autocommit;
    if (autocommit == undefined) autocommit = false;

    if (settings.options.type.toLowerCase() === "consumer") {
        logger.info("Creating a Kafka consumer for group: " + group);
        client = new Kafka.KafkaConsumer({
            'group.id': group,
            'metadata.broker.list': config.brokers,
            'enable.auto.commit': autocommit
        }, {
            // TODO: we'll want to expose some of these settings
            "auto.offset.reset": "smallest"
        });
    }
    else if (settings.options.type.toLowerCase() === "producer") {
        // TODO: all of these options should be over-rideable using settings.options.
        client = new Kafka.Producer({
          'metadata.broker.list': config.brokers,
          'queue.buffering.max.messages': 500000,
          'queue.buffering.max.ms': 1000,
          'batch.num.messages': 100000,
        });

        var pollInterval = 100;
        if (settings.options.pollInterval) pollInterval = settings.options.pollInterval;
        client.setPollInterval(pollInterval);
    }

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
        brokers: {
            doc: 'List of seed brokers for the kafka environment',
            default: ["localhost:9092"],
            format: Array
        },
        options: {
            doc: 'Connector specific configuration. Specifies `type` and `group`.',
            default: {
                type: 'consumer',
                group: 'terafoundation_kafka_connector'
            }
        }
    }
}

module.exports = {
    create: create,
    config_schema: config_schema
};