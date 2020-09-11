package SpringBootBauerProject.RestController.service;

import SpringBootBauerProject.RestController.model.Role;

import java.util.Set;

public interface RoleService {

    Role getRole(String name);

    Iterable<Role> findAll();

    //Set<Role> getRoles(String[] ids);

//    Role getRolesById(Long roleId);

    Set<Role> getSetRolesFromDB(Set<Role> roles);

    Set<Role> getSetRolesFromDBAndForm(Set<Role> roles, Set<Role> roles1);
}
