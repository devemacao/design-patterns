import User from "./User";

export default interface UserRepository {
  save(user: User): Promise<void>;
  getByEmail(email: string): Promise<User>;
}

export class UserRepositoryMemory implements UserRepository {
  private users: User[];
  private static instance: UserRepositoryMemory;

  private constructor() {
    this.users = [];
  }
  static getInstance() {
    if (!UserRepositoryMemory.instance) {
      UserRepositoryMemory.instance = new UserRepositoryMemory();
    }
    return this.instance;
  }
  async save(user: User): Promise<void> {
    this.users.push(user);
  }
  async getByEmail(email: string): Promise<User> {
    const user = this.users.find((user: User) => user.email === email);
    if (!user) throw new Error("User not found");
    return user;
  }
}
