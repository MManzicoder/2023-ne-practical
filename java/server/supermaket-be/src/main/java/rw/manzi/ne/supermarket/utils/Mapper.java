package rw.manzi.ne.supermarket.utils;

import org.modelmapper.ModelMapper;
import rw.manzi.ne.supermarket.models.User;

public class Mapper {

    public static ModelMapper modelMapper = new ModelMapper();

    public static User getUserFromDTO(Object object) {
        return modelMapper.map(object, User.class);
    }


}
