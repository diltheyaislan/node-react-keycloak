package dev.diltheyaislan.app.keycloak.provider.appdb.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import dev.diltheyaislan.app.infrastructure.database.DbConnection;
import dev.diltheyaislan.app.keycloak.provider.appdb.entity.User;

public class UserRepository implements IUserRepository {

	private final String SQL_SELECT = "SELECT * FROM users WHERE email=? OR CAST(id as text)=?";
	private final String SQL_INSERT = "INSERT INTO users (first_name, last_name, email, keycloak_id) VALUES (?, ?, ?, ?) RETURNING id";
	private final String SQL_UPDATE = "UPDATE users SET first_name=?, last_name=?, keycloak_id=? WHERE email=?";
	private final String SQL_DELETE = "DELETE FROM users WHERE email=?";
	private final String SQL_COUNT = "SELECT COUNT(*) AS count FROM users";
	private final String SQL_SELECT_ALL = "SELECT * FROM users";

	private DbConnection db = new DbConnection();

	private static UserRepository instance;

	private UserRepository() {

	}

	public static UserRepository getInstance() {
		if (instance == null) {
			instance = new UserRepository();
		}
		return instance;
	}
 
	@Override
	public String insert(User user) {
		
		if (get(user.getUsername()) != null) {
			return null;
		} 

		String insertedId = null;

		try {
			db.connect();
			db.createPreparedStatement(SQL_INSERT);

			db.getPreparedStatement().setString(1, user.getFirstName());
			db.getPreparedStatement().setString(2, user.getLastName());
			db.getPreparedStatement().setString(3, user.getEmail());
			db.getPreparedStatement().setString(4, user.getKeycloakId());

			db.getPreparedStatement().executeUpdate();
			
			ResultSet rs = db.getPreparedStatement().getGeneratedKeys();
			if (rs.next()) {
				insertedId = rs.getString(1);
			}

			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

		return insertedId;
	}

	@Override
	public User get(String username) {
		User user = null;
		try {
			db.connect();
			db.createPreparedStatement(SQL_SELECT);

			db.getPreparedStatement().setString(1, username);
			db.getPreparedStatement().setString(2, username);

			ResultSet rs = db.getPreparedStatement().executeQuery();

			if  (rs.next()) {
				user = new User();
				user.setId(rs.getString("id"));
				user.setFirstName(rs.getString("first_name"));
				user.setLastName(rs.getString("last_name"));
				user.setEmail(rs.getString("email"));
				user.setUsername(rs.getString("email"));
				user.setKeycloakId(rs.getString("keycloak_id"));
			}

			rs.close();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return user;
	}

	@Override
	public void update(User user) {
		try {
			db.connect();
			db.createPreparedStatement(SQL_UPDATE);

			db.getPreparedStatement().setString(1, user.getFirstName());
			db.getPreparedStatement().setString(2, user.getLastName());
			db.getPreparedStatement().setString(3, user.getKeycloakId());
			db.getPreparedStatement().setString(4, user.getEmail());

			db.getPreparedStatement().executeUpdate();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void remove(String username) {
		try {
			db.connect();
			db.createPreparedStatement(SQL_DELETE);

			db.getPreparedStatement().setString(1, username);

			db.getPreparedStatement().executeUpdate();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public int count() {
		int count = 0;
		try {
			db.connect();
			db.createPreparedStatement(SQL_COUNT);

			ResultSet rs = db.getPreparedStatement().executeQuery();

			if  (rs.next()) {
				count = rs.getInt("count");
			}

			rs.close();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return count;
	}

	@Override
	public List<User> getAll() {
		List<User> users = new ArrayList<>();
		try {
			db.connect();
			db.createPreparedStatement(SQL_SELECT_ALL);
			ResultSet rs = db.getPreparedStatement().executeQuery();

			while (rs.next()) {
				User user = new User();
				user.setId(rs.getString("id"));
				user.setFirstName(rs.getString("first_name"));
				user.setLastName(rs.getString("last_name"));
				user.setEmail(rs.getString("email"));
				user.setUsername(rs.getString("email"));
				user.setKeycloakId(rs.getString("keycloak_id"));
				users.add(user);
			}

			rs.close();
			db.disconnect();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return users;
	}
}
