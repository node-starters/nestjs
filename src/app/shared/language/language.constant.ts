export const MESSAGES_DATA = Symbol.for('MESSAGES:DATA') as unknown as string;

export const DEFAULT_LANG = Symbol.for('LANGUAGE:DEFAULT') as unknown as string;

export class LanguageConfig {
  static default = 'en';
  /** JSON file path to read messages */
  path!: string;
  /** Default language */
  default?: string;
}
