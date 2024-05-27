package rw.manzi.ne.supermarket.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rw.manzi.ne.supermarket.enums.Eoperation;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateQuantityDTO {

    @NotNull
    private UUID productCode;
    private Double quantity;
    private Eoperation operation;
}
