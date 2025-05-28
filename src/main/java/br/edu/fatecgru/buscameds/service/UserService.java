package br.edu.fatecgru.buscameds.service;

import br.edu.fatecgru.buscameds.model.User;
import br.edu.fatecgru.buscameds.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public void save(User user) {
        userRepository.save(user);
    }


    public void delete(String id) {
        userRepository.deleteById(id);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void update(User user) {
        userRepository.save(user);
    }

}
