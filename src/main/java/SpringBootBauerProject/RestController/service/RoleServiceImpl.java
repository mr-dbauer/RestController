package SpringBootBauerProject.RestController.service;

import SpringBootBauerProject.RestController.model.Role;
import SpringBootBauerProject.RestController.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public Role getRole(String name) {
        return roleRepository.findRoleByRoleName(name);
    }

    @Transactional
    @Override
    public Iterable<Role> findAll() {
        return roleRepository.findAll();
    }

//    @Transactional
//    @Override
//    public Set<Role> getRoles(String[] ids) {
//        return roleRepository.getRolesById(ids);
//    }

//    @Override
//    @Transactional
//    public Role getRolesById(Long roleId) {
//        return roleRepository.getRoleById();
//    }

    @Override
    @Transactional
    public Set<Role> getSetRolesFromDB(Set<Role> roles) {
        Set<Role> rolesFromDB = new HashSet<>();
        for (Role r : roles) {
            rolesFromDB.add(getRole(r.getRoleName()));
        }
        return rolesFromDB;
    }

    @Override
    @Transactional
    public Set<Role> getSetRolesFromDBAndForm(Set<Role> fromUser, Set<Role> fromForm) {
        Set<Role> rolesFromDB = new HashSet<>();
        for (Role r : fromForm) {
            rolesFromDB.add(getRole(r.getRoleName()));
        }
        rolesFromDB.addAll(fromUser);
        return rolesFromDB;
    }

}
