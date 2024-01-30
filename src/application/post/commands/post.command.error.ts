import { BaseDomainError } from '../../../domain/base-domain.error';

export class PostCommandError extends BaseDomainError {
  constructor(message: string) {
    super(message);
  }
}
