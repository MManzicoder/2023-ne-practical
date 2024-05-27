package rw.manzi.ne.supermarket.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import rw.manzi.ne.supermarket.dtos.CreateOrUpdateProductDTO;
import rw.manzi.ne.supermarket.dtos.CreateQuantityDTO;
import rw.manzi.ne.supermarket.dtos.SignUpDTO;
import rw.manzi.ne.supermarket.enums.ERole;
import rw.manzi.ne.supermarket.models.User;
import rw.manzi.ne.supermarket.payload.ApiResponse;
import rw.manzi.ne.supermarket.services.IProductService;
import rw.manzi.ne.supermarket.services.IQuantityService;
import rw.manzi.ne.supermarket.services.IUserService;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/quantities")
public class QuantityController {
    @Autowired
    private IQuantityService quantityService;

    @PostMapping(path = "/")
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody CreateQuantityDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(true, quantityService.create(dto)));
    }


}