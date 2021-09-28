package io.github.nicolasdesnoust.xyzingenierie.core.configuration;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableConfigurationProperties(CorsConfigurationProperties.class)
public class CorsConfiguration {

	@Bean
	public CorsFilter corsFilter(@Autowired CorsConfigurationProperties corsConfigurationProperties) {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		org.springframework.web.cors.CorsConfiguration config = new org.springframework.web.cors.CorsConfiguration();
		
		config.setAllowCredentials(true);
		config.addAllowedOrigin(corsConfigurationProperties.getAllowedOrigins());
		config.setAllowedHeaders(Arrays.asList(corsConfigurationProperties.getAllowedHeaders().split(",")));
		config.setAllowedMethods(Arrays.asList(corsConfigurationProperties.getAllowedMethods().split(",")));
		source.registerCorsConfiguration("/**", config);
		
		return new CorsFilter(source);
	}

}