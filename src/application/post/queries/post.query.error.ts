import { BaseApplicationError } from '../../base-application.error';

export class PostQueryError extends BaseApplicationError {
  constructor(message) {
    super(message);
  }
}
