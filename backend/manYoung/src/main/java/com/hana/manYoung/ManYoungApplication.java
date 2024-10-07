package com.hana.manYoung;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ManYoungApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(ManYoungApplication.class, args);
	}

	public SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ManYoungApplication.class);
	}

}
