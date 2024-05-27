package rw.manzi.ne.supermarket.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrUpdateProductDTO {
    @NotBlank
    private  String name;

    @NotBlank
    private  String productType;

    @NotNull
    private Double price;

    private LocalDateTime inDate;
}
