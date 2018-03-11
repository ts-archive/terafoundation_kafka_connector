'use strict';

const _ = require('lodash');

/**
 * settings contains a list of options to configure on the client.
 *
 * {
 *     options: {} // Options for the connector
 *     rdkafka_options: {} // Options for the node-rdkafka object.
 *          Valid options here are as defined by rdkafka
 *     topic_options: {} // Options as defined for rdkafka that are topic specific
 *     autoconnect: true // Whether the client should autoconnect or not.
 * }
 *
 * rdkafka settings: https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md
 */
function create(config, logger, settings) {
    const Kafka = require('node-rdkafka');

    let client;

    if (settings.options.type.toLowerCase() === 'consumer') {
        // Group can be passed in when the connection is requested by the
        // application or configured in terafoundation config.
        let group = settings.options.group;
        if (!group) group = config.group;

        // Default settings for the client. This uses the options we defined
        // before exposing all the settings available to rdkafka
        let clientOptions = {
            'group.id': group,
            'metadata.broker.list': config.brokers,
        };

        // Topic specific options as defined by librdkafka
        let topicOptions = {
            'auto.offset.reset': 'smallest'
        };

        topicOptions = _.assign(topicOptions, settings.topic_options);

        // Merge in any librdkafka options passed in by the user.
        clientOptions = _.assign(clientOptions, settings.rdkafka_options);

        logger.info(`Creating a Kafka consumer for group: ${group}`);
        client = new Kafka.KafkaConsumer(clientOptions, topicOptions);
    } else if (settings.options.type.toLowerCase() === 'producer') {
        // Default settings for the client. This uses the options we defined
        // before exposing all the settings available to rdkafka
        let clientOptions = {
            'metadata.broker.list': config.brokers,
            'queue.buffering.max.messages': 500000,
            'queue.buffering.max.ms': 1000,
            'batch.num.messages': 100000,
        };

        // Topic specific options as defined by librdkafka
        let topicOptions = {};

        topicOptions = _.assign(topicOptions, settings.topic_options);

        // Merge in any librdkafka options passed in by the user.
        clientOptions = _.assign(clientOptions, settings.rdkafka_options);

        client = new Kafka.Producer(clientOptions, topicOptions);

        let pollInterval = 100;
        if (settings.options.poll_interval) pollInterval = settings.options.poll_interval;
        client.setPollInterval(pollInterval);
    }

    // Default to autoconnecting but can be disabled.
    if (settings.autoconnect || settings.autoconnect === undefined) {
        client.connect({}, (err) => {
            if (err) {
                logger.error(`Error connecting to Kafka: ${err}`);
                throw err;
            } else {
                logger.info('Kafka connection initialized.');
            }
        });
    }

    return {
        client
    };
}

function configSchema() {
    return {
        brokers: {
            doc: 'List of seed brokers for the kafka environment',
            default: ['localhost:9092'],
            format: Array
        }
    };
}

module.exports = {
    create,
    config_schema: configSchema
};
