package com.ed0leo.bbfweb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "users-accounts")
@CrossOrigin(origins = "http://localhost:4200")
public class UserAccountController {
    private UserAccountService userAccountService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public void registerUser(@RequestBody UserAccount userAccount) {
        userAccountService.createUser(userAccount.getUsername(), userAccount.getPassword(), userAccount.getEmail());
    }

    @GetMapping("/{username}")
    @ResponseStatus(value = HttpStatus.OK)
    public UserAccount getUser(@PathVariable String username) {
        return userAccountService.getUser(username);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public void updateUser(@PathVariable String username, @RequestBody UserAccount userAccount) {
        userAccountService.updateUser(username, userAccount.getPassword());
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable String username) {
        userAccountService.deleteUser(username);
    }
}
