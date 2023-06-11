package com.ed0leo.bbfweb;

import java.util.List;

public interface UserService {

    public User insert(User userVO);

    public List<User> findAll();

    public void delete(int id);

    public User findById(int id);

    public User updateUser(int id, User userVO);
}