package SpringBootBauerProject.RestController.repository;

import SpringBootBauerProject.RestController.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmailAddress(String login);

    List<User> findAll();
}