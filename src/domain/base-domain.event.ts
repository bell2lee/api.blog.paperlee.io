export interface BaseDomainEvent<TopicName extends string, Message> {
  topic: TopicName;
  message: Message;
  meta: {
    publishedAt: number;
    publishedBy: string;
  };
}
