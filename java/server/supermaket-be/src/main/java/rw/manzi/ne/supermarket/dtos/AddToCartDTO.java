package rw.manzi.ne.supermarket.dtos;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class AddToCartDTO {
    @NotNull
    private UUID productCode;
    private Double quantity;
}
