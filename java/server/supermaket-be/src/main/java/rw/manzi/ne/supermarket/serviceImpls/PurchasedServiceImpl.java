package rw.manzi.ne.supermarket.serviceImpls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import rw.manzi.ne.supermarket.dtos.AddToCartDTO;
import rw.manzi.ne.supermarket.exceptions.BadRequestException;
import rw.manzi.ne.supermarket.exceptions.ResourceNotFoundException;
import rw.manzi.ne.supermarket.models.Product;
import rw.manzi.ne.supermarket.models.Purchased;
import rw.manzi.ne.supermarket.models.Quantity;
import rw.manzi.ne.supermarket.repositories.IProductRepository;
import rw.manzi.ne.supermarket.repositories.IPurchasedRepository;
import rw.manzi.ne.supermarket.repositories.IQuantityRepository;
import rw.manzi.ne.supermarket.services.IProductService;
import rw.manzi.ne.supermarket.services.IPurchasedService;
import rw.manzi.ne.supermarket.services.IUserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service

public class PurchasedServiceImpl implements IPurchasedService {

    @Autowired
    private IPurchasedRepository purchasedRepository;
    @Autowired
    private IQuantityRepository quantityRepository;
    @Autowired
    private IProductService productService;
   @Autowired
   private IUserService userService;
 @Autowired
 private IProductRepository productRepository;
    @Override
    @PreAuthorize("isAuthenticated()" )
    public Purchased create(AddToCartDTO dto) {
        Optional<Purchased> purchasedBy = purchasedRepository.findByUserAndProductCode(userService.getLoggedInUser(),productService.findByCode(dto.getProductCode()));
        if (purchasedBy.isPresent()){
            Purchased alreadyPurchased = purchasedBy.get();
            alreadyPurchased.setQuantity(alreadyPurchased.getQuantity()+dto.getQuantity());
            return purchasedRepository.save(alreadyPurchased);
        }
       Purchased purchased = new Purchased();
        Quantity quantity =  quantityRepository.findByProductCode(productService.findByCode(dto.getProductCode()));
        if (quantity.getQuantity() < dto.getQuantity() || (quantity.getQuantity()-dto.getQuantity()) < 0){
            throw new BadRequestException("The selected quantity is not in the stock");
        }
        LocalDateTime localDateTime = LocalDateTime.now();
        purchased.setDate(localDateTime);
        purchased.setQuantity(dto.getQuantity());
        quantity.setQuantity(quantity.getQuantity()-dto.getQuantity());
        quantity = quantityRepository.save(quantity);
        Product product = productService.findByCode(dto.getProductCode());
        product.setQuantity(quantity);
        productRepository.save(product);
        purchased.setProductCode(product);
        purchased.setUser(userService.getLoggedInUser());
        purchased.setTotal(product.getPrice() * dto.getQuantity());
        return purchasedRepository.save(purchased);
    }

    @Override
    public Page<Purchased> findAll(Pageable pageable) {
        return purchasedRepository.findAll(pageable);
    }

    @Override
    public Purchased findById(UUID id) {
        return purchasedRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Purchased", "id", id.toString()));
    }

    @Override
    public List<Purchased> findByCustomer(UUID customer) {
        return purchasedRepository.findByUser(customer);
    }


}
