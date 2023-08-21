package com.ed0leo.bbfweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "habit")
@CrossOrigin(origins = "http://localhost:4200")
public class HabitController {
    @Autowired
    private HabitService habitService;

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Habit> getAllHabits() {
        return habitService.getHabits();
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Habit createHabit(@RequestBody Habit habit) {
        return habitService.addHabit(habit);
    }

    @GetMapping(params = { "userId" })
    @ResponseStatus(value = HttpStatus.OK)
    public List<Habit> getHabitsByUser(@RequestParam int userId) {
        return habitService.getHabitsByUser(userId);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Habit updateHabit(@PathVariable int id, @RequestBody Habit habit) {
        Habit existingHabit = habitService.getHabitById(id);
        if (existingHabit != null) {
            existingHabit.setName(habit.getName());
            existingHabit.setBadHabit(habit.isBadHabit());
            existingHabit.setUser(habit.getUser());

            // Update other properties as needed

            return habitService.updateHabit(existingHabit);
        } else {
            throw new HabitNotFoundException("Habit not found with ID: " + id);
        }
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteHabit(@PathVariable int id) {
        habitService.deleteHabit(id);
    }
}
