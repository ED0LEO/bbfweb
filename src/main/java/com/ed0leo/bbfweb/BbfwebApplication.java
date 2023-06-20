package com.ed0leo.bbfweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
public class BbfwebApplication {

	public static void main(String[] args) {
		SpringApplication.run(BbfwebApplication.class, args);
	}

}
