package com.ed0leo.bbfweb;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HabitRepository extends JpaRepository<Habit, Integer> {
    List<Habit> findByUser_Id(int userId);
}
