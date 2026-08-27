export function createProducer(kafkaClient) {
  return kafkaClient.producer();
}
