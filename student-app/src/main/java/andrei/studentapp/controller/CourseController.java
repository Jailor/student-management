package andrei.studentapp.controller;

import andrei.studentapp.model.Course;
import andrei.studentapp.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/course")
@CrossOrigin
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            return new ResponseEntity<>(course.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable String id, @RequestBody Course courseDetails) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            Course updatedCourse = course.get();
            updatedCourse.setCourseCode(courseDetails.getCourseCode());
            updatedCourse.setCourseName(courseDetails.getCourseName());
            updatedCourse.setCourseDescription(courseDetails.getCourseDescription());
            updatedCourse.setCredits(courseDetails.getCredits());
            System.out.println(updatedCourse.getPrerequisites());
            System.out.println(courseDetails.getPrerequisites());
            updatedCourse.setPrerequisites(courseDetails.getPrerequisites());
            return new ResponseEntity<>(courseRepository.save(updatedCourse), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCourse(@PathVariable String id) {
        try {
            courseRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}