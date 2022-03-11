console.log("Consumer is running..")
// const Kafka = require('node-rdkafka')
// const eventType = require('../eventType.js')

// use node-rdkafka
// const consumer = Kafka.KafkaConsumer(
//     { 
//         'group.id': 'kafka',
//         'metadata.broker.list': 'localhost:9092' // define broker, localhost:9092 is one broker 
//     }, // conf
//     {} // topicConfig
// )
// consumer.connect()


const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'get-news-app-consumer',
  brokers: ['localhost:9092']
})


const consumer = kafka.consumer({ groupId: 'consumer-1' })

const run = async () => {
  
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'test', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ /*topic, partition,*/ message }) => {
            // From Kafka's perspective, both key and value are just bytes
            // so we need to parse them.
            console.log({
                key: message.key.toString(),
                value: JSON.parse(message.value.toString())
            })
        }
    })
}

run().catch(console.error)

// consumer.on('ready', () => {
//     console.log("Consumer is ready")
//     consumer.subscribe(['test']) // an array of topic
//     consumer.consume()
// }).on('data', (data) => {
//     // anytime new data comes in
//     const news = eventType.newsType.fromBuffer(data.value)
//     console.log(`Received news: \n
//     Title: ${news.title} 
//     Description: ${news.description} 
//     Url: ${news.url} 
//     Published At: ${news.publishedAt}`)
//     console.log("=======================")
// })