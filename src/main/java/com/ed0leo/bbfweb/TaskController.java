package com.ed0leo.bbfweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
        return this.taskService.getTasks();
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Task createTask(@RequestBody Task task) {
        return this.taskService.addTask(task);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable int id) {
        this.taskService.deleteTask(id);
    }
}
