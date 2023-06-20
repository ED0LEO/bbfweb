package com.ed0leo.bbfweb;

import java.util.List;

public interface TaskService {
    public List<Task> getTasks();
    public Task addTask(Task task);
    public void deleteTask(int id);
}
