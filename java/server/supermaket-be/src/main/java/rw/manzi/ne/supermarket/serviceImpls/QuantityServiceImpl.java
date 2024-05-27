package rw.manzi.ne.supermarket.serviceImpls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rw.manzi.ne.supermarket.dtos.CreateQuantityDTO;
import rw.manzi.ne.supermarket.models.Product;
import rw.manzi.ne.supermarket.models.Quantity;
import rw.manzi.ne.supermarket.repositories.IProductRepository;
import rw.manzi.ne.supermarket.repositories.IQuantityRepository;
import rw.manzi.ne.supermarket.services.IProductService;
import rw.manzi.ne.supermarket.services.IQuantityService;

import java.time.LocalDateTime;

@Service
public class QuantityServiceImpl  implements IQuantityService {
    @Autowired
    private IProductService productService;
    @Autowired
    private IQuantityRepository quantityRepository;
    @Autowired
    private IProductRepository productRepository;
    @Override
    public Quantity create(CreateQuantityDTO dto) {
        Product product = productService.findByCode(dto.getProductCode());
        Quantity quantity = new Quantity();
        quantity.setQuantity(dto.getQuantity());
        quantity.setDate(LocalDateTime.now());
        quantity.setProductCode(product);
        quantity.setOperation(dto.getOperation());
        quantity = quantityRepository.save(quantity);
        product.setQuantity(quantity);
        productRepository.save(product);
        return quantity;
    }
}
