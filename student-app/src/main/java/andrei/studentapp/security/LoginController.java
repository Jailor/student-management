package andrei.studentapp.security;


import andrei.studentapp.dto.LoginDTORequest;
import andrei.studentapp.dto.LoginDTOResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/login")
public class LoginController {
    @Autowired
    LoginService loginService;
    @Autowired
    JwtService jwtService;

    @PostMapping()
    public @ResponseBody LoginDTOResponse login(@RequestBody LoginDTORequest loginDTORequest) {
        LoginDTOResponse response = loginService.login(loginDTORequest.getUsername(), loginDTORequest.getPassword());
        if(response.isValid()){
            response.setJsonWebToken(jwtService.generateToken(loginDTORequest.getUsername()));
        }
        return response;
    }

    @GetMapping()
    public String loginTest() {
        return "test";
    }
}
