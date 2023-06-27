package com.ed0leo.bbfweb;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserAccountController {
    private UserAccountService userAccountService;

    public UserAccountController(UserAccountService userAccountService) {
        this.userAccountService = userAccountService;
    }

    @PostMapping("/register")
    public void registerUser(@RequestBody UserAccount userAccount) {
        userAccountService.createUser(userAccount.getUsername(), userAccount.getPassword(), userAccount.getEmail());
    }

    @GetMapping("/{username}")
    public UserAccount getUser(@PathVariable String username) {
        return userAccountService.getUser(username);
    }

    @PutMapping("/{username}")
    public void updateUser(@PathVariable String username, @RequestBody UserAccount userAccount) {
        userAccountService.updateUser(username, userAccount.getPassword());
    }

    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable String username) {
        userAccountService.deleteUser(username);
    }
}
