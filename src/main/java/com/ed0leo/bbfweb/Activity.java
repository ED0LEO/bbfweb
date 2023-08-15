package com.ed0leo.bbfweb;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "activities_table")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private String name;

    @Column
    private LocalTime startTime;

    @Column
    private LocalTime endTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // ... Getters and setters

    @Override
    public String toString() {
        return "Activity [id=" + id + ", name=" + name + ", startTime=" + startTime + ", endTime=" + endTime + "]";
    }
}
