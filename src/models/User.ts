export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserModel {
  private static users: User[] = [];

  static create(user: User): User {
    const newUser: User = {
      ...user,
      id: (this.users.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  static findAll(): User[] {
    return this.users;
  }

  static findById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  static update(id: string, userData: Partial<User>): User | undefined {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...userData,
        updatedAt: new Date()
      };
      return this.users[userIndex];
    }
    return undefined;
  }

  static delete(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    return this.users.length < initialLength;
  }
}
