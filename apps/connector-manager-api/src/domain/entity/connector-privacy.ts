export class ConnectorPrivacy {
  private readonly privacy: string;

  get value(): string {
    return this.privacy;
  }

  private validateEnumPrivacy(privacy: string): boolean {
    const validateString = ['PUBLIC', 'PRIVATE'];
    return validateString.includes(privacy);
  }

  constructor(privacy: string) {
    const isValidEnumPrivacy = this.validateEnumPrivacy(privacy);

    if (!isValidEnumPrivacy) {
      throw new Error('Invalid privacy');
    }

    this.privacy = privacy;
  }
}
