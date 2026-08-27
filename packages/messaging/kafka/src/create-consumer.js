export function createConsumer(kafka, { groupId }) {
  return kafka.consumer({ groupId });
}
