console.log("Producer is running..")
const Kafka = require('node-rdkafka')
const eventType = require('../eventType.js')

// if not in production mode then use the .env file
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

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

refreshNews()

function getNews() {
    // console.log(index)
    const news = newsList[index];
    index++
    return news
}

const stream = Kafka.Producer.createWriteStream(
    // define broker, localhost:9092 is one broker 
    {'metadata.broker.list': 'localhost:9092'}, // conf
    {}, // topicConfig
    {topic: 'test'}   // streamOption
)

function queueMessage() {
    // create event object
    if (index < newsList.length) {
        const news = getNews();
         // const success = stream.write(Buffer.from('Hello')) // success is true or false
        const success = stream.write(eventType.newsType.toBuffer(news))
        if(success) {
            console.log("Message wrote sucessfully")
        } else {
            console.log("Fail to write message")
        } 
    } else {
        refreshNews()
    }
}

setInterval(() => {
    queueMessage()
}, 3000) // each 3000ms do the callback 


