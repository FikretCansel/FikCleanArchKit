export type AppEvent = {
  readonly type: string;
  readonly occurredAt: Date;
};

export type EventHandler<TEvent extends AppEvent = AppEvent> = (
  event: TEvent
) => void;

export interface EventBus {
  publish<TEvent extends AppEvent>(event: TEvent): void;
  subscribe<TEvent extends AppEvent>(
    eventType: TEvent["type"],
    handler: EventHandler<TEvent>
  ): () => void;
}
