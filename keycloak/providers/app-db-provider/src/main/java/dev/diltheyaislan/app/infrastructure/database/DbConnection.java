package dev.diltheyaislan.app.infrastructure.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

import org.jboss.logging.Logger;

import dev.diltheyaislan.app.infrastructure.utils.PropertiesReader;

public class DbConnection {

	private final Logger log = Logger.getLogger(DbConnection.class);

	PropertiesReader reader = new PropertiesReader("database.properties");

	private final String JDBC_DRIVER = reader.getProperty("db.driver", "-org.postgresql.Driver");  
	private final String DB_NAME = reader.getProperty("db.name", "-app");
	private final String DB_URL = reader.getProperty("db.url", "-jdbc:postgresql://app_db:5432");
	private final String DB_USER =  reader.getProperty("db.user", "-postgres");
	private final String DB_PASS =  reader.getProperty("db.pass", "-password");

	private Connection connection;
	private Statement statement;
	private PreparedStatement preparedStatement;

	public Connection connect() throws ClassNotFoundException, SQLException {
		log.infov("Connecting to database: JDBC={0}, DB={1}, URL={2}, USER={3}, PASS={4}", JDBC_DRIVER, DB_NAME, DB_URL + "/" + DB_NAME, DB_USER, DB_PASS);

		Class.forName(JDBC_DRIVER);
		return connection = DriverManager.getConnection(DB_URL + "/" + DB_NAME, DB_USER, DB_PASS);
	}

	public Connection getConnection() {
		return connection;
	}

	public void disconnect() throws SQLException {
		preparedStatementDisconnect();
		statementDisconnect();
		connection.close();
	}

	public PreparedStatement createPreparedStatement(String sql) throws SQLException {
		preparedStatementDisconnect();
		return preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
	}

	public PreparedStatement getPreparedStatement() {
		return preparedStatement;
	}

	public void preparedStatementDisconnect() throws SQLException {
		if (preparedStatement != null) {
			preparedStatement.close();
		}
	}

	public Statement createStatement() throws SQLException {
		statementDisconnect();
		return statement = connection.createStatement();
	}

	public Statement getStatement() {
		return statement;
	}

	public void statementDisconnect() throws SQLException {
		if (statement != null) {
			statement.close();
		}
	}
}
