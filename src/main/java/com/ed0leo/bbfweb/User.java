package com.ed0leo.bbfweb;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "TBL_USERS")
public class User {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private int id;
    @Column private String firstName;
    @Column private String lastName;
    @Column private String username;
    @Column private String password;
    //Getters, setters, constructors and toString() method
}