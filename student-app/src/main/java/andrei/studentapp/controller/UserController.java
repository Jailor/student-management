package andrei.studentapp.controller;

import andrei.studentapp.model.User;
import andrei.studentapp.repository.UserRepository;
import com.mongodb.MongoWriteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            return new ResponseEntity<>(userRepository.save(user), HttpStatus.CREATED);
        }
        catch (Exception e){
            System.err.println(e.getMessage());
            if(e.getMessage().contains("duplicate key error")){
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            else{
                throw e;
            }
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User userDetails) {
        try {
            Optional<User> user = userRepository.findById(id);
            if (user.isPresent()) {
                User updatedUser = user.get();
                updatedUser.setUsername(userDetails.getUsername());
                updatedUser.setPassword(userDetails.getPassword());
                updatedUser.setName(userDetails.getName());
                updatedUser.setRole(userDetails.getRole());
                return new ResponseEntity<>(userRepository.save(updatedUser), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e){
            System.err.println(e.getMessage());
            if(e.getMessage().contains("duplicate key error")){
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            else{
                throw e;
            }
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable String id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}