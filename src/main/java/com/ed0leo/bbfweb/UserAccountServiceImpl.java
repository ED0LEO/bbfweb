package com.ed0leo.bbfweb;

import java.util.HashMap;
import java.util.Map;

public class UserAccountServiceImpl implements UserAccountService {
    private Map<String, UserAccount> users;

    public UserAccountServiceImpl() {
        users = new HashMap<>();
    }

    @Override
    public void createUser(String username, String password, String email) {
        if (users.containsKey(username)) {
            throw new IllegalArgumentException("Username already exists");
        }

        UserAccount newUser = new UserAccount(username, password, email);
        users.put(username, newUser);
    }

    @Override
    public UserAccount getUser(String username) {
        return users.get(username);
    }

    @Override
    public void updateUser(String username, String newPassword) {
        if (!users.containsKey(username)) {
            throw new IllegalArgumentException("Username does not exist");
        }

        UserAccount user = users.get(username);
        user.setPassword(newPassword);
    }

    @Override
    public void deleteUser(String username) {
        if (!users.containsKey(username)) {
            throw new IllegalArgumentException("Username does not exist");
        }

        users.remove(username);
    }
}
