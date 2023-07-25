export class ConnectorType {
  private readonly type: string;

  get value(): string {
    return this.type;
  }

  private validateEnumType(type: string): boolean {
    const validateString = ['REST', 'SOAP', 'BD'];
    return validateString.includes(type);
  }

  constructor(type: string) {
    const isValidEnumType = this.validateEnumType(type);

    if (!isValidEnumType) {
      throw new Error('Invalid type');
    }

    this.type = type;
  }
}
