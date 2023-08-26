package com.ed0leo.bbfweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "activity")
@CrossOrigin(origins = "http://localhost:4200")
public class ActivityController {
    @Autowired
    private ActivityService activityService;

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Activity> getAllActivities() {
        return activityService.getActivities();
    }

    @GetMapping(params = { "userId" })
    @ResponseStatus(value = HttpStatus.OK)
    public List<Activity> getActivitiesByUser(@RequestParam int userId) {
        return activityService.getActivitiesByUser(userId);
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Activity createActivity(@RequestBody Activity activity) {
        return activityService.addActivity(activity);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Activity updateActivity(@PathVariable int id, @RequestBody Activity activity) {
        Activity existingActivity = activityService.getActivityById(id);
        if (existingActivity != null) {
            existingActivity.setName(activity.getName());
            existingActivity.setStartTime(activity.getStartTime());
            existingActivity.setEndTime(activity.getEndTime());
            existingActivity.setUser(activity.getUser());

            // Update other properties as needed

            return activityService.updateActivity(existingActivity);
        } else {
            throw new ActivityNotFoundException("Activity not found with ID: " + id);
        }
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteActivity(@PathVariable int id) {
        activityService.deleteActivity(id);
    }
}
