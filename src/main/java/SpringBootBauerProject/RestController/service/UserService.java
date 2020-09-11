package SpringBootBauerProject.RestController.service;

import SpringBootBauerProject.RestController.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    List<User> getAllUsers();

    void updateUser(User user);

    void updateUserWithoutPassword(User user);

    void deleteUserById(long id);

    User getUsersById(long id);

    User addUser(User user);

    UserDetails loadUserByUsername(String username);

    User getAuthenticatedUser();
}

