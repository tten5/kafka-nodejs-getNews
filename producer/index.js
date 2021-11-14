console.log("Producer is running..")
const Kafka = require('node-rdkafka')
const eventType = require('../eventType.js')

const stream = Kafka.Producer.createWriteStream(
    // define broker, localhost:9092 is one broker 
    {'metadata.broker.list': 'localhost:9092'}, // conf
    {}, // topicConfig
    {topic: 'test'}   // streamOption
)

function queueMessage() {
    // create event object
    const category = getRandomAnimal()
    const noise = getRandomNoise(category)
    const event = {category, noise}
    // const success = stream.write(Buffer.from('Hello')) // success is true or false
    const success = stream.write(eventType.toBuffer(event))
    if(success) {
        console.log("Message wrote sucessfully")
    } else {
        console.log("Fail to write message")
    } 
}

function getRandomAnimal() {
    const categories = ['CAT', 'DOG'];
    return categories[Math.floor(Math.random() * categories.length)];
}
  
function getRandomNoise(animal) {
    if (animal === 'CAT') {
        const noises = ['meow', 'purr'];
        return noises[Math.floor(Math.random() * noises.length)];
    } else if (animal === 'DOG') {
        const noises = ['bark', 'woof'];
        return noises[Math.floor(Math.random() * noises.length)];
    } else {
         return 'silence..';
    }
  }

setInterval(() => {
    queueMessage()
}, 3000) // each 3000ms do the callback 


