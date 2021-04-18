package dev.diltheyaislan.app.keycloak.provider.appdb.repository;

import java.util.List;

import dev.diltheyaislan.app.keycloak.provider.appdb.entity.User;

public interface IUserRepository {

	String insert(User user);
    User get(String username);
    void update(User user);
    void remove(String username);
	int count();
	List<User> getAll();
}
