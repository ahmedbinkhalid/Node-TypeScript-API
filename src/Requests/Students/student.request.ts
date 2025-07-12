export class CreateStudentRequest {
  name: string;
  fatherName: string;

  constructor(body: any) {
    this.name = body.name;
    this.fatherName = body.fatherName;
  }

  public isValid(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.name || typeof this.name !== 'string') {
      errors.push('Student name is required and must be a string.');
    }

    if (!this.fatherName || typeof this.fatherName !== 'string') {
      errors.push('Father name is required and must be a string.');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
