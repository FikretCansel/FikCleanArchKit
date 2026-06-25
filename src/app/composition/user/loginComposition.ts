import { LoginUserUseCase, RegisterUserUseCase } from "@/features/auth/application";
import {
  ApiAuthRepository,
  createAuthApiClient
} from "@/features/auth/infrastructure";
import type { LoginPageContent } from "@/features/auth/presentation/LoginPageModel";
import type { EventBus } from "@/shared/events/EventBus";
import { InMemoryEventBus } from "@/shared/events/InMemoryEventBus";

type LoginApplicationCompositionOptions = {
  baseUrl?: string;
  eventBus?: EventBus;
};

export function createLoginApplicationComposition(
  options: LoginApplicationCompositionOptions = {}
) {
  const eventBus = options.eventBus ?? new InMemoryEventBus();
  const repository = new ApiAuthRepository(
    createAuthApiClient({ baseUrl: options.baseUrl })
  );

  return {
    loginUser: new LoginUserUseCase(repository, eventBus),
    registerUser: new RegisterUserUseCase(repository, eventBus)
  };
}

export function createLoginPageComposition() {
  return {
    content: {
      projectName: "CleanShop Frontend",
      title: "Login",
      description:
        "Clean Architecture, DDD ve event driven auth akisini gosteren login sayfasi.",
      credentialsHint: "Kullanici adi ve sifre: fikret / fikret"
    } satisfies LoginPageContent
  };
}

export type LoginApplicationComposition = ReturnType<
  typeof createLoginApplicationComposition
>;
export type LoginPageComposition = ReturnType<typeof createLoginPageComposition>;
