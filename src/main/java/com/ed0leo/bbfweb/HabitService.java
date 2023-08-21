package com.ed0leo.bbfweb;

import java.util.List;

public interface HabitService {
    List<Habit> getHabits();
    List<Habit> getHabitsByUser(int userId);
    Habit addHabit(Habit habit);
    void deleteHabit(int id);
    Habit getHabitById(int id);
    Habit updateHabit(Habit habit);
}
