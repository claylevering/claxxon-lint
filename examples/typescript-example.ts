/**
 * Example TypeScript file
 */

interface User {
  id: number;
  name: string;
  email: string;
}

interface Config {
  apiUrl: string;
  timeout: number;
}

class UserService {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async fetchUser(id: number): Promise<User> {
    const response = await fetch(`${this.config.apiUrl}/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    
    return response.json() as Promise<User>;
  }

  async updateUser(user: User): Promise<User> {
    const response = await fetch(
      `${this.config.apiUrl}/users/${user.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }
    
    return response.json() as Promise<User>;
  }
}

export type { User, Config };
export { UserService };
