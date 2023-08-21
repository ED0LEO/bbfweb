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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getLastUsedTime() {
        return lastUsedTime;
    }

    public void setLastUsedTime(LocalDateTime lastUsedTime) {
        this.lastUsedTime = lastUsedTime;
    }

    public boolean isBadHabit() {
        return isBadHabit;
    }

    public void setBadHabit(boolean badHabit) {
        isBadHabit = badHabit;
    }

    @Override
    public String toString() {
        return "Habit [id=" + id + ", name=" + name + ", lastUsedTime=" + lastUsedTime + ", isBadHabit=" + isBadHabit + "]";
    }
}
