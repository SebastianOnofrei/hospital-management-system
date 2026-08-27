import {
  createKafka,
  createProducer,
} from "../../../../../packages/messaging/kafka/src/index.js";

const brokers = (process.env.KAFKA_BROKERS ?? "localhost:9092")
  .split(",")
  .map((broker) => broker.trim())
  .filter(Boolean);

export const kafka = createKafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers,
});

export const kafkaProducer = createProducer(kafka);
