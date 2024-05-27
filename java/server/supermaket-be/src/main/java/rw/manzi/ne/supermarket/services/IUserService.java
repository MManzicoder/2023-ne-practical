package rw.manzi.ne.supermarket.services;

import rw.manzi.ne.supermarket.models.User;


public interface IUserService {

    User create(User user);

    boolean isNotUnique(User user);

    void validateNewRegistration(User user);

    User getLoggedInUser();

}