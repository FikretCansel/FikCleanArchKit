export class Password {
  private constructor(private readonly rawValue: string) {}

  static create(value: string): Password {
    const normalized = value.trim();

    if (normalized.length < 3) {
      throw new Error("Password en az 3 karakter olmali.");
    }

    return new Password(normalized);
  }

  value(): string {
    return this.rawValue;
  }
}
