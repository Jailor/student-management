package andrei.studentapp.repository;

import andrei.studentapp.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    // Additional custom methods if needed
}