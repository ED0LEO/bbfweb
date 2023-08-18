package com.ed0leo.bbfweb;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "habits_table")
public class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private String name;

    @Column
    private LocalDateTime lastUsedTime;

    @Column
    private boolean isBadHabit;

    // ... Getters and setters

    @Override
    public String toString() {
        return "Habit [id=" + id + ", name=" + name + ", lastUsedTime=" + lastUsedTime + ", isBadHabit=" + isBadHabit + "]";
    }
}
