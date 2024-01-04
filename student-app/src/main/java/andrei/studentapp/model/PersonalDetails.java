package andrei.studentapp.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PersonalDetails {
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate dateOfBirth;
    private EnrollmentStatus enrollmentStatus;

    public PersonalDetails() {
        super();
    }

    public PersonalDetails(String firstName, String lastName, String email, LocalDate dateOfBirth, EnrollmentStatus enrollmentStatus) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.enrollmentStatus = enrollmentStatus;
    }
}
