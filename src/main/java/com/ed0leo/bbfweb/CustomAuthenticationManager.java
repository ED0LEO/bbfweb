package com.ed0leo.bbfweb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationManager {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticate(String username, String password) {
        // Retrieve user from the database based on the provided username
        User user = userRepository.findByUsername(username);

        if (user != null) {
            // Compare the provided password with the user's stored password
            return password.equals(user.getPassword());
        }

        return false; // Authentication failed if no matching username is found
    }
}
