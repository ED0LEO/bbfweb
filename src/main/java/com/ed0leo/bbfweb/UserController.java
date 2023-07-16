package com.ed0leo.bbfweb;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@RestController
//@RequestMapping(value = "user")
//@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping(value = "user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
//    @Value("${jwt.secret}")
//    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpiration;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomAuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;


    @PostMapping(value = "/user-login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        // Authenticate the user
        boolean authenticated = authenticationManager.authenticate(username, password);

        if (authenticated) {
            // Get the user from the repository
            User user = userRepository.findByUsername(username);

            if (user != null) {
                // Generate JWT token with userId
                String token = generateToken(username, user.getId());

                // Prepare the login response
                Map<String, String> loginResponse = new HashMap<>();
                loginResponse.put("token", token);

                return ResponseEntity.ok(loginResponse);
            } else {
                // User not found in the database
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    private String generateToken(String username, long userId) {
        // Generate a secure key for HS256 algorithm
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        // Set the token expiration date
        Date expirationDate = new Date(System.currentTimeMillis() + jwtExpiration * 1000);

        // Generate the JWT token
        String token = Jwts.builder()
                .setSubject(username)
                .claim("userId", userId)
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(key)
                .compact();

        return token;
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