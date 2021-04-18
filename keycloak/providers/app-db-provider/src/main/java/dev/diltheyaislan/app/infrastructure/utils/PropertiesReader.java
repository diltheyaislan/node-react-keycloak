package dev.diltheyaislan.app.infrastructure.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesReader {
	private Properties properties;
	private static PropertiesReader instance;

    public PropertiesReader(String propertyFileName) {
        InputStream is = getClass().getClassLoader()
            .getResourceAsStream(propertyFileName);
        this.properties = new Properties();
        try {
			this.properties.load(is);
		} catch (IOException e) {
			e.printStackTrace();
		}
    }

    public String getProperty(String propertyName) {
        return this.properties.getProperty(propertyName);
    }

    public String getProperty(String propertyName, String defaultValue) {
        String value = getProperty(propertyName);
		if (value == null) {
			return defaultValue;
		}
		return value;
    }
}
