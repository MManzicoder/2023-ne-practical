package rw.manzi.ne.supermarket.services;

import rw.manzi.ne.supermarket.dtos.CreateQuantityDTO;
import rw.manzi.ne.supermarket.models.Quantity;

public interface IQuantityService {
    Quantity create(CreateQuantityDTO dto);
}
