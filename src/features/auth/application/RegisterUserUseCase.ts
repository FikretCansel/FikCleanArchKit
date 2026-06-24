import type { EventBus } from "@/shared/events/EventBus";
import {
  createUserLoggedInEvent,
  Password,
  UserIdentity
} from "../domain";
import type { AuthRepository, AuthSession } from "../domain";

export type RegisterUserInput = {
  username: string;
  password: string;
};

export class RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(input: RegisterUserInput): Promise<AuthSession> {
    const session = await this.authRepository.register({
      username: UserIdentity.create(input.username),
      password: Password.create(input.password)
    });

    this.eventBus.publish(createUserLoggedInEvent(session));

    return session;
  }
}
