package io.github.nicolasdesnoust.xyzingenierie.core.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class OpenApiConfiguration {

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI().info(new Info()
				.title("XYZ Ingénierie API")
				.version("1.0.0")
				.description("Il s'agit de la documentation de l'API REST d'une application web factice.")
				.termsOfService("http://swagger.io/terms/")
				.license(new License().name("Apache 2.0").url("")));
	}
}