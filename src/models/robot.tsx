export default class Robot {
    id: number;
    name: string;
    email: string;
    username: string;

    constructor(id: number, name: string, email: string, username: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
    }

    setId(id: number) {
        this.id = id;
    }
    
    getName() { return this.name; }

    setName(name: string) {
        this.name = name;
    }
    
    getEmail() { return this.email; }

    setEmail(email: string) {
        this.email = email;
    }
    
    getUsername() { return this.username; }

    setUsername(username: string) {
        this.username = username;
    }
    
    getId() { return this.id; }
}