package rw.manzi.ne.supermarket.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInDTO {

    @NotBlank
    private  String email;

    @NotBlank
    private  String password;
}

