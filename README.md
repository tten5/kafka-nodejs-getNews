# kafka-nodejs-getNews
Practice using kafka by making app getting news from newsapi and display it on consumer

newsAPI: https://newsapi.org/ 

please use your own API_KEY, it is free to register new one 

# Prerequisites 
- Create an .env file at root, and write into that file ``API_KEY=your_API_KEY``
- Nodejs 
- Docker 

# How to use
- First run the docker compose to start the kafka in background
`./cmd.sh start`

- Then createTopic to create topic `test`
`./cmd.sh createTopic`

- Open 2 terminals, one for producer and one for consumer. 

- On producer terminal: 
``npm run start:producer``

- On consumer terminal: 
``npm run start:consumer``


**Other commands**

- Describe the current topics 
``/cmd.sh describe `` 

- Delete topic `test` 
`/cmd.sh deleteTopic `

- List all topic
`/cmd.sh listTopics `

- Stop 
``/cmd.sh stop``

- Read all messages in broker 
``/cmd.sh readMessage `` 

- Write message to broker 
``/cmd.sh writeMessage `` 

**Used packages: (Updated 220311)**
- ~~node-rdkafka:  Node.js wrapper for Kafka C/C++ library~~ 
- ~~avsc: pure js implementation of the Avro (serialize service) --> in order to write object into stream and consume oject from stream~~
- kafkajs (use JSON to stringify instead of using binary with Avro, eventhough Avro is better but take more to implement) 
