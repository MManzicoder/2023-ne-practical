package rw.manzi.ne.supermarket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.manzi.ne.supermarket.models.Product;
import rw.manzi.ne.supermarket.models.Quantity;

import java.util.List;
import java.util.UUID;

@Repository
public interface IQuantityRepository extends JpaRepository<Quantity, UUID> {
    public Quantity findByProductCode(Product code);

}
