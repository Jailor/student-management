package andrei.studentapp.repository;

public interface StudentNameEmailProjection {
    PersonalDetailsProjection getPersonalDetails();

    interface PersonalDetailsProjection {
        String getFirstName();
        String getLastName();
        String getEmail();
    }
}
