import type { AppEvent, EventBus, EventHandler } from "./EventBus";

export class InMemoryEventBus implements EventBus {
  private readonly handlers = new Map<string, Set<EventHandler>>();

  publish<TEvent extends AppEvent>(event: TEvent): void {
    this.handlers.get(event.type)?.forEach((handler) => handler(event));
  }

  subscribe<TEvent extends AppEvent>(
    eventType: TEvent["type"],
    handler: EventHandler<TEvent>
  ): () => void {
    const handlers = this.handlers.get(eventType) ?? new Set<EventHandler>();
    handlers.add(handler as EventHandler);
    this.handlers.set(eventType, handlers);

    return () => {
      handlers.delete(handler as EventHandler);
    };
  }
}
