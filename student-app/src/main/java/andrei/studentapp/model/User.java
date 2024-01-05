package andrei.studentapp.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
@Getter
@Setter
public class User {
    @Id
    private String id;
    @Indexed(unique = true)
    private String username;
    private String name;
    private String password;
    private String role;
}
