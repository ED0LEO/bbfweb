package com.ed0leo.bbfweb;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByCompletionAndCompletionDate(boolean completion, LocalDate completionDate);
}
