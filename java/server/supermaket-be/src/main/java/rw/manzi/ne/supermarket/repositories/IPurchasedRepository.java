package rw.manzi.ne.supermarket.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.manzi.ne.supermarket.models.Product;
import rw.manzi.ne.supermarket.models.Purchased;
import rw.manzi.ne.supermarket.models.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IPurchasedRepository extends JpaRepository<Purchased, UUID> {
    Optional<Purchased> findByUserAndProductCode(User user, Product productCode);
    List<Purchased> findByUser(UUID customer);
    Page<Purchased> findAll(Pageable pageable);
}
