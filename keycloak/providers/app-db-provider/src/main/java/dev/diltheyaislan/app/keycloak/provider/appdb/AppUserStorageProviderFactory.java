package dev.diltheyaislan.app.keycloak.provider.appdb;

import org.keycloak.component.ComponentModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.storage.UserStorageProviderFactory;

import dev.diltheyaislan.app.keycloak.provider.appdb.repository.UserRepository;

public class AppUserStorageProviderFactory 
	implements UserStorageProviderFactory<AppUserStorageProvider> {
    	
		public AppUserStorageProviderFactory() {
		}

		public String getId() {
			return "app-db-provider";
		}
		
		public AppUserStorageProvider create(KeycloakSession ksession, ComponentModel model) {
			return new AppUserStorageProvider(ksession, model, UserRepository.getInstance());
		}
}
