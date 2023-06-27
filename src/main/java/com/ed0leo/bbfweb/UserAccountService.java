package com.ed0leo.bbfweb;

public interface UserAccountService {
    void createUser(String username, String password, String email);

    UserAccount getUser(String username);

    void updateUser(String username, String newPassword);

    void deleteUser(String username);
}
