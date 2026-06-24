import type { EventBus } from "@/shared/events/EventBus";
import {
  createUserLoggedInEvent,
  Password,
  UserIdentity
} from "../domain";
import type { AuthRepository, AuthSession } from "../domain";

export type LoginUserInput = {
  username: string;
  password: string;
};

export class LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(input: LoginUserInput): Promise<AuthSession> {
    const session = await this.authRepository.login({
      username: UserIdentity.create(input.username),
      password: Password.create(input.password)
    });

    this.eventBus.publish(createUserLoggedInEvent(session));

    return session;
  }
}
