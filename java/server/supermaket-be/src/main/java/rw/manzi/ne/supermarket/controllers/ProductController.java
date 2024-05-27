package rw.manzi.ne.supermarket.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rw.manzi.ne.supermarket.dtos.CreateOrUpdateProductDTO;
import rw.manzi.ne.supermarket.dtos.SignUpDTO;
import rw.manzi.ne.supermarket.enums.ERole;
import rw.manzi.ne.supermarket.models.User;
import rw.manzi.ne.supermarket.payload.ApiResponse;
import rw.manzi.ne.supermarket.services.IProductService;
import rw.manzi.ne.supermarket.services.IUserService;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v1/products")
public class ProductController {
    @Autowired
    private IProductService productService;

    @GetMapping(path = "/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> getAll(@RequestParam(value = "page", defaultValue ="0" ) int page,
                                              @RequestParam(value = "limit", defaultValue ="100") int limit) {
        Pageable pageable = PageRequest.of(page,limit);

        return ResponseEntity.ok(new ApiResponse(true, productService.findAll(pageable)));
    }

    @PostMapping(path = "/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody CreateOrUpdateProductDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(true, productService.create(dto)));
    }


    @PutMapping("/{id}/update-file")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> updateFile(
            @PathVariable UUID id,
            @RequestParam("file") MultipartFile document) {
        return ResponseEntity.ok(new ApiResponse(true,productService.updateFile(id, document)));
    }

}