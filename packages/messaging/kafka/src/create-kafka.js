import { Kafka } from "kafkajs";

export function createKafka({ clientId, brokers }) {
  return new Kafka({ clientId, brokers });
}
