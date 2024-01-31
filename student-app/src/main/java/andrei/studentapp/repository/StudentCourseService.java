package andrei.studentapp.repository;

import andrei.studentapp.model.Course;
import andrei.studentapp.model.Enrollment;
import andrei.studentapp.model.PersonalDetails;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentCourseService {

    private final MongoTemplate mongoTemplate;

    public StudentCourseService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<StudentCourseDetails> getStudentCourseDetails() {
        // Define a $lookup operation
        LookupOperation lookupOperation = LookupOperation.newLookup()
                .from("courses") // The collection to join
                .localField("enrollments.courseId") // The field from the input documents
                .foreignField("id") // The field from the documents of the "from" collection
                .as("courseDetails"); // The output array field

        // Define the aggregation pipeline
        Aggregation aggregation = Aggregation.newAggregation(lookupOperation);

        // Perform the aggregation
        AggregationResults<StudentCourseDetails> results = mongoTemplate.aggregate(
                aggregation, "students", StudentCourseDetails.class);

        return results.getMappedResults();
    }

    public static class StudentCourseDetails {
        // Add fields according to your requirements
        @Id
        private String id;
        private PersonalDetails personalDetails;
        private List<Enrollment> enrollments;
        private List<Course> courseDetails; // Contains joined course details
    }
}