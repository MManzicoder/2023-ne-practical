package rw.manzi.ne.supermarket.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.manzi.ne.supermarket.dtos.AddToCartDTO;
import rw.manzi.ne.supermarket.models.Purchased;

import java.util.List;
import java.util.UUID;

public interface IPurchasedService {
   Page<Purchased> findAll(Pageable pageable);
    Purchased findById(UUID id);
    List<Purchased> findByCustomer(UUID customer);
    Purchased create(AddToCartDTO dto);

}
