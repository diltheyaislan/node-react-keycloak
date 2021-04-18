import Session from 'express-session';
import KeycloakConnect from 'keycloak-connect';
import Express from 'express';

class Keycloak {
  private static keycloak: KeycloakConnect.Keycloak;
  private static memoryStore: Session.MemoryStore;

  public static initKeycloak(): KeycloakConnect.Keycloak {
    if (this.keycloak) {
      return this.keycloak;
    }

    const memoryStore = this.getMemoryStore();
    this.keycloak = new KeycloakConnect({ store: memoryStore });
    return this.keycloak;
  }

  public static getInstance(): KeycloakConnect.Keycloak {
    if (!this.keycloak) {
      this.keycloak = this.initKeycloak();
    }

    return this.keycloak;
  }

  public static middleware(): Express.RequestHandler {
    return Session({
      secret: process.env.APP_SECRET || '',
      resave: false,
      saveUninitialized: true,
      store: this.getMemoryStore()
    });
  }

  private static getMemoryStore(): Session.MemoryStore {
    if (!this.memoryStore) {
      this.memoryStore = new Session.MemoryStore();
    }

    return this.memoryStore;
  }
}

export default Keycloak;
