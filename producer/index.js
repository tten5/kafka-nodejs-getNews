console.log("Producer is running..")
// const Kafka = require('node-rdkafka')
// const newsType = require('../eventType.js')

const { Kafka } = require('kafkajs')

// if not in production mode then use the .env file
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const kafka = new Kafka({
  clientId: 'get-news-app-producer',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()


const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);

let newsList = []
let index = 0

// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
function refreshNews() {
    newsList = []
    index = 0
    newsapi.v2.topHeadlines({
        category: ['health', 'science'],
        // category: 'business',
        // q: 'bitcoin',
        language: 'en',
        // country: 'us'
    }).then(response => {
        // console.log(response);
        response.articles.forEach(news => {
            delete news.source
            delete news.urlToImage
            delete news.author
            delete news.content
            // console.log(news)
            newsList.push(news)
        })
      /*
        {
          status: "ok",
          totalResults: ...,
          articles: [...]
        }
      */
    }).catch(console.log);
}

// init
refreshNews()

function getNews() {
    // console.log(index)
    const news = newsList[index];
    index++
    return news
}

// using node-rdkafka
// const stream = Kafka.Producer.createWriteStream(
//     // define broker, localhost:9092 is one broker 
//     {'metadata.broker.list': 'localhost:9092'}, // conf
//     {}, // topicConfig
//     {topic: 'test'}   // streamOption
// )

async function queueMessage() {
    // create event object
    // Producing
        

    if (index < newsList.length) {
        const news = getNews();
         // const success = stream.write(Buffer.from('Hello')) // success is true or false
        // const success = stream.write(eventType.newsType.toBuffer(news))
        // if(success) {
        //     console.log("Message wrote sucessfully")
        // } else {
        //     console.log("Fail to write message")
        // }

        try {
            await producer.send({
                topic: 'test',
                messages: [{ key: 'news', value: JSON.stringify(news) }],
            })
            console.log("Message wrote sucessfully")

        } catch(err) {
            console.log(err)
            console.log("Fail to write message")
        }

    } else {
        refreshNews()
    }
}



const run = async () => {
    await producer.connect() 

    setInterval(() => {
        queueMessage()
    }, 3000) // each 3000ms do the callback  
  
}

run().catch(console.error)
