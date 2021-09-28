package io.github.nicolasdesnoust.xyzingenierie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class XyzingenierieApplication {

	public static void main(String[] args) {
		SpringApplication.run(XyzingenierieApplication.class, args);
	}

}
