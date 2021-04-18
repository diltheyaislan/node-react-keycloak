package dev.diltheyaislan.app.keycloak.provider.appdb;

import java.util.List;
import java.util.Map;

import org.jboss.logging.Logger;
import org.keycloak.component.ComponentModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.RealmModel;
import org.keycloak.storage.StorageId;
import org.keycloak.storage.adapter.AbstractUserAdapterFederatedStorage;

import dev.diltheyaislan.app.keycloak.provider.appdb.entity.User;
import dev.diltheyaislan.app.keycloak.provider.appdb.repository.UserRepository;

public class AppUserAdapter extends AbstractUserAdapterFederatedStorage {

	private final Logger log = Logger.getLogger(AppUserAdapter.class);

	private final User user;

	public AppUserAdapter(KeycloakSession session, RealmModel realm, ComponentModel model, User user) {
		super(session, realm, model);
		this.user = user;
	}
	
	@Override
	public String getId() {
		if (storageId == null) {
            storageId = new StorageId(storageProviderModel.getId(), user.getId());
        }
		log.infov("[Keycloak UserModel Adapter] Getting Id {0}....", storageId.getId());
        return storageId.getId();
	}

	@Override
	public String getUsername() {
		log.infov("[Keycloak UserModel Adapter] Getting username {0}....", user.getUsername());
		return user.getUsername();
	}

	@Override
	public void setUsername(String username) {
		user.setUsername(username);
	}

	@Override
	public String getEmail() {
		log.infov("[Keycloak UserModel Adapter] Getting email {0}....",  user.getEmail());
		return user.getEmail();
	}

	@Override
	public void setEmail(String email) {
		log.infov("[Keycloak UserModel Adapter] Setting email: email={0}", email);
		user.setEmail(email);
	}

	@Override
	public String getFirstName() {
		log.infov("[Keycloak UserModel Adapter] Getting firstName ....");
		return user.getFirstName();
	}

	@Override
	public void setFirstName(String firstName) {
		log.infov("[Keycloak UserModel Adapter] Setting firstName: firstName={0}", firstName);
		user.setFirstName(firstName);
	}

	@Override
	public String getLastName() {
		log.infov("[Keycloak UserModel Adapter] Getting lastName ....");
		return user.getLastName();
	}

	@Override
	public void setLastName(String lastName) {
		log.infov("[Keycloak UserModel Adapter] Setting lastName: lastName={0}", lastName);
		user.setLastName(lastName);
	}

	@Override
	public String getFirstAttribute(String name) {
		log.infov("[Keycloak UserModel Adapter] Getting first value of attribute {0} ....", name);
		return getFederatedStorage().getAttributes(realm, this.getId()).getFirst(name);
	}

	@Override
	public Map<String, List<String>> getAttributes() {
		log.infov("[Keycloak UserModel Adapter] Getting all attributes ....");
		return getFederatedStorage().getAttributes(realm, this.getId());
	}

	@Override
	public List<String> getAttribute(String name) {
		log.infov("[Keycloak UserModel Adapter] Getting values of attribute {0} ....", name);
		return getFederatedStorage().getAttributes(realm, this.getId()).get(name);
	}

	@Override
	public void setSingleAttribute(String name, String value) {
		log.infov("[Keycloak UserModel Adapter] Setting attribute {0} with value {1}", name, value);
		getFederatedStorage().setSingleAttribute(realm, this.getId(), name, value);
	}

	@Override
	public void setAttribute(String name, List<String> values) {
		log.infov("[Keycloak UserModel Adapter] Setting attribute {0} with values {1}", name, values);

		switch(name){
			case "firstName": 
				user.setFirstName(values.get(0));
				break;
			case "lastName": 
				user.setLastName(values.get(0));
				break;
			case "email": 
				user.setUsername(values.get(0));
				user.setEmail(values.get(0));
				break;
			case "username": 
				user.setUsername(values.get(0));
				user.setEmail(values.get(0));
				break;
		}

		if (user.getKeycloakId() == null) {
			user.setKeycloakId(getId());
		}

		AppTransaction transaction = new AppTransaction(UserRepository.getInstance(), user);
		ensureTransactionStarted(transaction);
		getFederatedStorage().setAttribute(realm, this.getId(), name, values);
	}

	private void ensureTransactionStarted(AppTransaction transaction) {
		if (transaction.getState() == AppTransaction.TransactionState.NOT_STARTED) {
			log.infov("Enlisting user repository transaction ...");
			session.getTransactionManager().enlistAfterCompletion(transaction);
		}
	}
}
