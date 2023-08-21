package com.ed0leo.bbfweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class HabitServiceImpl implements HabitService {
    @Autowired
    private HabitRepository habitRepository;

    @Override
    public List<Habit> getHabits() {
        return habitRepository.findAll();
    }

    @Override
    public Habit getHabitById(int id) {
        Optional<Habit> habitOptional = habitRepository.findById(id);
        return habitOptional.orElse(null);
    }

    @Override
    public List<Habit> getHabitsByUser(int userId) {
        return habitRepository.findByUser_Id(userId);
    }

    @Override
    public void deleteHabit(int id) {
        habitRepository.deleteById(id);
    }

    @Override
    public Habit addHabit(Habit habit) {
        return habitRepository.save(habit);
    }

    @Override
    public Habit updateHabit(Habit habit) {
        return habitRepository.save(habit);
    }
}
