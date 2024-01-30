import { BaseDomainEvent } from './base-domain.event';

export abstract class BaseAggregateRoot<Topic extends string, Data> {
  private readonly _domainEvents: BaseDomainEvent<Topic, Data>[] = [];

  get domainEvents() {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: any) {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents() {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
