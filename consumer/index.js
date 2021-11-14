console.log("Consumer is running..")
import Kafka from 'node-rdkafka'
import eventType from '../eventType.js'

const consumer = Kafka.KafkaConsumer(
    { 
        'group.id': 'kafka',
        'metadata.broker.list': 'localhost:9092' // define broker, localhost:9092 is one broker 
    }, // conf
    {} // topicConfig
)

consumer.connect()

consumer.on('ready', () => {
    console.log("Consumer is ready")
    consumer.subscribe(['test']) // an array of topic
    consumer.consume()
}).on('data', (data) => {
   // anytime new data comes in
    console.log(`Received message: ${eventType.fromBuffer(data.value)}`)
})