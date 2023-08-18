package com.ed0leo.bbfweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "task")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Task> getAllTasks() {
        return taskService.getTasks();
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Task createTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @GetMapping(params = { "completionDate" })
    @ResponseStatus(HttpStatus.OK)
    public List<Task> getCompletedTasksByDate(@RequestParam String completionDate) {
        return taskService.getCompletedTasksByDate(completionDate);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Task updateTask(@PathVariable int id, @RequestBody Task task) {
        Task existingTask = taskService.getTaskById(id);
        if (existingTask != null) {
            existingTask.setTitle(task.getTitle());
            existingTask.setDescription(task.getDescription());
            existingTask.setCompletion(task.isCompletion());
            existingTask.setUser(task.getUser());
            if (task.isCompletion()) {
                existingTask.setCompletionDate(LocalDate.now()); // Set the completion date
            } else {
                existingTask.setCompletionDate(null); // Clear the completion date if not completed
            }
            return taskService.updateTask(existingTask);
        } else {
            throw new TaskNotFoundException("Task not found with ID: " + id);
        }
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable int id) {
        taskService.deleteTask(id);
    }
}
