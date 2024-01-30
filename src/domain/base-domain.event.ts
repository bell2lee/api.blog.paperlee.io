export interface BaseDomainEvent<TopicName extends string, Message> {
  topic: TopicName;
  message: Message;
}
