package com.ex.models;

import org.hibernate.annotations.Proxy;

import javax.persistence.*;


/**
 * This is a POJO that should represent a category in our application
 * It uses hibernate to set up the correct design of the database
 *
 * id - the id of the category, used just for the database, it is a generated value
 * title - the title of the category
 *
 */
@Entity
@Table(name = "categories", schema = "linkedin")
@Proxy(lazy = false)
public class Category {

    @Id
    @Column(name="id", columnDefinition ="serial primary key")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title")
    private String title;



    public Category(){

    }

    public Category(String title) {

        this.title = title;

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }
}

