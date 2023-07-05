package com.ed0leo.bbfweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.ed0leo.bbfweb")
public class BbfwebApplication {
	public static void main(String[] args) {
		SpringApplication.run(BbfwebApplication.class, args);
	}
}
