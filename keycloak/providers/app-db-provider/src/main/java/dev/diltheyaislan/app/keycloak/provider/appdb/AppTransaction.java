package dev.diltheyaislan.app.keycloak.provider.appdb;

import org.jboss.logging.Logger;
import org.keycloak.models.AbstractKeycloakTransaction;

import dev.diltheyaislan.app.keycloak.provider.appdb.entity.User;
import dev.diltheyaislan.app.keycloak.provider.appdb.repository.IUserRepository;

public class AppTransaction extends AbstractKeycloakTransaction {

	private final Logger log = Logger.getLogger(AppTransaction.class);

    private final IUserRepository userRepository;
    private final User user;

    public AppTransaction(IUserRepository userRepository, User user) {
        this.userRepository = userRepository;
        this.user = user;
    }

    @Override
    protected void commitImpl() {
        log.infov("Updating user to external repository in a transaction.");
        log.infov("User to be updated into the repository: {0}", user.toString());
        userRepository.update(user);
    }

    @Override
    protected void rollbackImpl() {
        log.infov("Rolling back data change to external user repository ...");
    }
}
