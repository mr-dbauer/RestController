package SpringBootBauerProject.RestController.controllers;

import SpringBootBauerProject.RestController.model.Role;
import SpringBootBauerProject.RestController.model.User;
import SpringBootBauerProject.RestController.service.RoleService;
import SpringBootBauerProject.RestController.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/rest/")
public class MainRestController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public MainRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @GetMapping("/userInfo")
    public User getAuthenticatedUser() {
        return userService.getAuthenticatedUser();
    }

    @GetMapping("/adminInfo")
    public User getAuthenticatedAdmin() {
        return userService.getAuthenticatedUser();
    }

    @PostMapping("/addUser")
    public User add(@RequestBody User user) {
        Set<Role> roles = user.getRoles();
        user.setRoles(roleService.getSetRolesFromDB(roles));
        userService.addUser(user);
        return user;
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getUserById/{id}")
    public User getUserById(@PathVariable(value = "id") Long id) {
        return userService.getUsersById(id);
    }

    @PutMapping("/updateUser")
    public User editUser(@RequestBody User editUser) {
        Set<Role> roles1 = editUser.getRoles();
        User UserFromDB = userService.getUsersById(editUser.getId());
        Set<Role> roles = roleService.getSetRolesFromDBAndForm(UserFromDB.getRoles(), editUser.getRoles());
        editUser.setRoles(roles);
        userService.updateUser(editUser);
        return userService.getUsersById(editUser.getId());
    }
}
