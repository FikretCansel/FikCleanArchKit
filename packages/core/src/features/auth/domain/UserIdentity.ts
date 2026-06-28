export class UserIdentity {
  private constructor(private readonly rawValue: string) {}

  static create(value: string): UserIdentity {
    const normalized = value.trim();

    if (normalized.length < 3) {
      throw new Error("Kullanici adi en az 3 karakter olmali.");
    }

    return new UserIdentity(normalized);
  }

  value(): string {
    return this.rawValue;
  }
}
