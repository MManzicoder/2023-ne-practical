package rw.manzi.ne.supermarket.serviceImpls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rw.manzi.ne.supermarket.dtos.CreateOrUpdateProductDTO;
import rw.manzi.ne.supermarket.exceptions.ResourceNotFoundException;
import rw.manzi.ne.supermarket.fileHandling.File;
import rw.manzi.ne.supermarket.models.Product;
import rw.manzi.ne.supermarket.repositories.IProductRepository;
import rw.manzi.ne.supermarket.services.IFileService;
import rw.manzi.ne.supermarket.services.IProductService;

import java.util.List;
import java.util.UUID;
@Service

public class ProductServiceImpl implements IProductService {
    @Autowired
    private IFileService fileService;
    @Autowired
    private IProductRepository productRepository;
    @Value("${uploads.directory}")
    private String directory;

    @Override
    public Product create(CreateOrUpdateProductDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setInDate(dto.getInDate());
        product.setProductType(dto.getProductType());
        return productRepository.save(product);
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Product findByCode(UUID id) {
        return productRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Product", "id", id.toString()));
    }

    public Product updateFile(UUID id, MultipartFile document){
        Product product = findByCode(id);
        File file = this.fileService.create(document, directory);
        product.setImage(file);
        return productRepository.save(product);
    }
}
