export class Token {
  private constructor(private readonly rawValue: string) {}

  static create(value: string): Token {
    const normalized = value.trim();

    if (!normalized) {
      throw new Error("Token bos olamaz.");
    }

    return new Token(normalized);
  }

  value(): string {
    return this.rawValue;
  }
}
