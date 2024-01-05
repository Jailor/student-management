package andrei.studentapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class LoginDTOResponse {
    // json web token
    private String jsonWebToken;

    // user details
    private String role;
    private String username;
    private String name;
    private String id;

    // error details
    private Boolean badCredentials;
    private Boolean usernameNotFound;
    private Boolean multipleUsersFound;

    public LoginDTOResponse(){
        this.badCredentials = false;
        this.usernameNotFound = false;
        this.multipleUsersFound = false;
    }
    public Boolean isValid(){
        return !this.badCredentials && !this.usernameNotFound && !this.multipleUsersFound;
    }
}
