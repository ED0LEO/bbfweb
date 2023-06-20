package com.ed0leo.bbfweb;

import java.util.List;

public interface TaskService {
    Task createTask(Task task);
    List<Task> getAllTasks();
    void deleteTask(Long id);
}
