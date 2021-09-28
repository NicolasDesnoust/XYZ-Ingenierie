package io.github.nicolasdesnoust.xyzingenierie.core.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "xyz-ingenierie.cors")
public class CorsConfigurationProperties {

	private String allowedOrigins;
	private String allowedHeaders;
	private String allowedMethods;

}