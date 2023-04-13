import { hash, compare, genSalt } from 'bcrypt';

class PasswordUtil {
  #salt!: string;
  async genSalt(): Promise<void> {
    if (!this.#salt) {
      this.#salt = await genSalt(10);
    }
  }
  async hash(pwd: string): Promise<string> {
    await this.genSalt();
    return await hash(pwd, this.#salt);
  }
  async compare(pwd: string, hash: string) {
    return compare(pwd, hash);
  }
}

export const passwordUtil = new PasswordUtil();
