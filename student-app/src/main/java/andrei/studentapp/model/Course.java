package andrei.studentapp.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("courses")
@Getter
@Setter
public class Course {
    @Id
    private String id;
    private String courseCode;
    private String courseName;
    private String courseDescription;
    private int credits;
    private List<String> prerequisites; // List of course IDs

    public Course() {
        super();
    }

    public Course(String courseCode, String courseName, String courseDescription, int credits, List<String> prerequisites) {
        super();
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.credits = credits;
        this.prerequisites = prerequisites;
    }
}