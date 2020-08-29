package com.ex.service;

import com.ex.dao.HibDao;
import com.ex.models.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This class will be used as a medium between the controller and the DAO
 * It will handle any business logic and return needed info to the controller
 *
 */
@Service
public class CategoryService {

    private HibDao dao;

    @Autowired
    public CategoryService(HibDao dao){
        this.dao = dao;
    }

    /**
     * This will call the dao to return all categories in the database
     *
     * @return - a list of all category objects in the database
     */
    public List<Category> getAllCats() {
        return dao.getAllCats();
    }

    /**
     * This will get the category that is associated with the id using the dao
     *
     * @param id - the id of the category being grabbed
     * @return - a category object associated with the id
     */
    public Category getCategory(int id) {
        return dao.getCategoryById(id);
    }


}
