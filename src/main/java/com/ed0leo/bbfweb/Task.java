package com.ed0leo.bbfweb;

import javax.persistence.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks_table")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

    @Column
    private String title;
    @Column
    private String description;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
