console.log("Consumer is running..")
const Kafka = require('node-rdkafka')
const eventType = require('../eventType.js')

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
    const news = eventType.newsType.fromBuffer(data.value)
    console.log(`Received news: \n
    Title: ${news.title} 
    Description: ${news.description} 
    Url: ${news.url} 
    Published At: ${news.publishedAt}`)
    console.log("=======================")
})