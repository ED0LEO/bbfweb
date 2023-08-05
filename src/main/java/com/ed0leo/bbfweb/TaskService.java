package com.ed0leo.bbfweb;

import java.util.List;

public interface TaskService {
    List<Task> getTasks();
    List<Task> getCompletedTasksByDate(String completionDate);
    Task addTask(Task task);
    void deleteTask(int id);
    Task getTaskById(int id);
    Task updateTask(Task task);
}
