package ergtec.repository;

import ergtec.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUserRepository extends JpaRepository<UserEntity, Integer> {

    @Query(value = "select u from user u")
    List<UserEntity> findAllUsers();

    UserEntity findById(int id);
}