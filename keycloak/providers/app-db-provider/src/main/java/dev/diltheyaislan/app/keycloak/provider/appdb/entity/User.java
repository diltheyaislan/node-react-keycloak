package dev.diltheyaislan.app.keycloak.provider.appdb.entity;

import dev.diltheyaislan.app.keycloak.provider.appdb.HashUtil;

public class User {
	private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
	private String keycloakId;

	public User() {
	}

    public User(String id, String firstName, String lastName, String email, String keycloakId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = this.email.toLowerCase();
		this.keycloakId = keycloakId;
        setPassword(this.username);
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username == null ? email : username;
	}

	public void setUsername(String username) {
		if (username != null) {
			this.username = username;
		}
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		if (firstName != null) {
			this.firstName = firstName;
		}
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		if (lastName != null) {
			this.lastName = lastName;
		}
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		if (email != null) {
			this.email = email;
		}
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
        this.password = HashUtil.hashString(password);
    }

	public String getKeycloakId() {
		return keycloakId;
	}

	public void setKeycloakId(String keycloakId) {
		this.keycloakId = keycloakId;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", password=" + password + ", username=" + username + ", keycloakId=" + keycloakId + "]";
	}

	
}