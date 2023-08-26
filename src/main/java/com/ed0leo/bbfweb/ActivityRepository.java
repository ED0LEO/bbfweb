package com.ed0leo.bbfweb;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {
    List<Activity> findByUser_Id(int userId);
}
