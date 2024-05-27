package rw.manzi.ne.supermarket.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import rw.manzi.ne.supermarket.dtos.AddToCartDTO;
import rw.manzi.ne.supermarket.dtos.CreateOrUpdateProductDTO;
import rw.manzi.ne.supermarket.dtos.SignUpDTO;
import rw.manzi.ne.supermarket.enums.ERole;
import rw.manzi.ne.supermarket.models.User;
import rw.manzi.ne.supermarket.payload.ApiResponse;
import rw.manzi.ne.supermarket.services.IProductService;
import rw.manzi.ne.supermarket.services.IPurchasedService;
import rw.manzi.ne.supermarket.services.IUserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/purchased")
public class PurchasedController {
    @Autowired
    private IPurchasedService purchasedService;

    @GetMapping(path = "/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> getAll(  @RequestParam(value = "page", defaultValue ="0" ) int page,
                                                @RequestParam(value = "limit", defaultValue ="10") int limit
    ){
        Pageable pageable = PageRequest.of(page,limit);
        return ResponseEntity.ok(new ApiResponse(true, purchasedService.findAll(pageable)));
    }

    @PostMapping(path = "/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> buy(@Valid @RequestBody AddToCartDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(true,purchasedService.create(dto)));
    }

    @PostMapping(path = "/checkout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> checkout (@Valid @RequestBody List<AddToCartDTO> dtos){
        for(AddToCartDTO dto: dtos){
            purchasedService.create(dto);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(true, "Bought successfully!"));
    }


}