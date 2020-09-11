package SpringBootBauerProject.RestController.repository;

import SpringBootBauerProject.RestController.model.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface RoleRepository extends CrudRepository<Role, Long> {

    Role findRoleByRoleName(String name);

    @Override
    Iterable<Role> findAll();

    //et<Role> getRolesById(String[] ids);

//    Role getRoleById();
}

