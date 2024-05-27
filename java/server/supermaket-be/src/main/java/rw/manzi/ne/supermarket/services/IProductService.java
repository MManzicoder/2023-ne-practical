package rw.manzi.ne.supermarket.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import rw.manzi.ne.supermarket.dtos.CreateOrUpdateProductDTO;
import rw.manzi.ne.supermarket.models.Product;

import java.util.List;
import java.util.UUID;

public interface IProductService {
    Product create(CreateOrUpdateProductDTO dto);
    Page<Product> findAll(Pageable pageable);
    Product findByCode(UUID id);
    Product updateFile(UUID code, MultipartFile document);


}
