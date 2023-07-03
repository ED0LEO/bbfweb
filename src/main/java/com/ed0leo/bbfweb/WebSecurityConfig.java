package com.ed0leo.bbfweb;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        manager.createUser(User.withDefaultPasswordEncoder().username("uuu").password("uuu").roles("USER").build());
        return manager;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/login").permitAll() // Allow access to the login page
                        .anyRequest().authenticated()
                )
                .formLogin((form) -> form
                        .loginPage("/login") // Set the login page URL
//                        .defaultSuccessUrl("/users") // Set the URL to redirect after successful login
                        .permitAll()
                );
//                .logout((logout) -> logout
////                        .logoutUrl("/logout") // Set the logout URL
////                        .logoutSuccessUrl("/login?logout") // Set the URL to redirect after successful logout
//                        .permitAll()
//                );

        return http.build();
    }
}
