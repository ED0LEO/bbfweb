package com.ed0leo.bbfweb;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

//@RestController
//@RequestMapping(value = "user")
//@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping(value = "user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

//    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(value = "/user-login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        // Authenticate the user
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Generate token
            String token = jwtTokenUtil.generateToken(userDetails);

            // Prepare the login response
            Map<String, String> loginResponse = new HashMap<>();
            loginResponse.put("token", token);

            return ResponseEntity.ok(loginResponse);

//            String token = "example_token";
//
//            // Prepare the login response
//            Map<String, String> loginResponse = new HashMap<>();
//            loginResponse.put("token", token);
//
//            // Return the login response with the token
//            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public User registerUser(@RequestBody User userVO) {
        return this.userService.insert(userVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<User> findAllUser() {
        return this.userService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public User findById(@PathVariable int id) {
        return this.userService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public User updateUser(@PathVariable int id, @RequestBody User userVO) {
        return this.userService.updateUser(id, userVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable int id) {
        this.userService.delete(id);
    }
}