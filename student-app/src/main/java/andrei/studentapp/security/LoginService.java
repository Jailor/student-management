package andrei.studentapp.security;


import andrei.studentapp.dto.LoginDTOResponse;
import andrei.studentapp.model.User;
import andrei.studentapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {
    @Autowired
    UserRepository userRepository;

    public LoginDTOResponse login(String username, String password) {
        List<User> users = userRepository.findByUsername(username);
        LoginDTOResponse response = new LoginDTOResponse();

        if(users.isEmpty()) {
           response.setUsernameNotFound(true);
        }
        if(users.size() > 1){
            response.setMultipleUsersFound(true);
        }
        if(response.isValid()){
            User user = users.get(0);

            boolean okPassword = user.getUsername().equals(username) && user.getPassword().equals(password);
            if(!okPassword){
                response.setBadCredentials(true);
            }
            else {
                response.setRole(user.getRole());
                response.setName(user.getName());
                response.setId(user.getId());
                response.setUsername(user.getUsername());
            }
        }

        return response;
    }
}
