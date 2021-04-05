package com.hoald.orderfoodapplication.service.serviceimpl;
import com.hoald.orderfoodapplication.model.entity.Role;
import com.hoald.orderfoodapplication.repository.RoleRepository;
import com.hoald.orderfoodapplication.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public Role findRoleByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public Role create(Long id, String name) {
        Role role = new Role(id, name);
        return roleRepository.save(role);
    }


}
