package rw.manzi.ne.supermarket.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.manzi.ne.supermarket.models.Product;
import rw.manzi.ne.supermarket.models.Purchased;

import java.util.UUID;

@Repository
public interface IProductRepository extends JpaRepository<Product, UUID> {
    Page<Product> findAll(Pageable pageable);
}
