

start() {
    docker-compose up -d 
}

stop() {
    docker-compose down --volumes --remove-orphans
}

createTopic() {
    docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
    --create \
    --bootstrap-server localhost:9092 \
    --replication-factor 1 \
    --partitions 1 \
    --topic test --if-not-exists
    echo "Done creating topic 'test'"
}

deleteTopic() {
    docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
    --bootstrap-server localhost:9092 \
    --delete \
    --topic test 
    echo "Done deleting topic 'test'"
}

listTopics() {
    docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
    --bootstrap-server localhost:9092 \
    --list
}

describe() {
    docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
    --describe \
    --bootstrap-server localhost:9092 \
    --topic test
}

readMessage() {
    docker exec -it kafka /opt/bitnami/kafka/bin/kafka-console-consumer.sh \
    --bootstrap-server localhost:9092 \
    --from-beginning \
    --topic test
}

writeMessage() {
    docker exec -it kafka /opt/bitnami/kafka/bin/kafka-console-producer.sh \
    --broker-list localhost:9092 \
    --topic test
}


CMD=${1}
case $CMD in
    "start")
        echo "Starting kafka container..."
        start
    ;;
    "stop")
        echo "Stopping containers..."
        stop
    ;;

    "createTopic")
        echo "Creating topic 'test'..."
        createTopic
    ;;

    "deleteTopic")
        echo "Deleting topic 'test'..."
        deleteTopic
    ;;

    "listTopics")
        echo "List all topics..."
        listTopics
    ;;


    "describe")
        echo "Describing topic 'test'..."
        describe
    ;;

    "readMessage")
        echo "Consumer read messages..."
        readMessage
    ;;
    
    "writeMessage")
        echo "Producer write message..."
        writeMessage
    ;;

    *)
        echo "Unknown command"
    ;;
esac