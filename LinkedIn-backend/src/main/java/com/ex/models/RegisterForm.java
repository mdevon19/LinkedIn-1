package com.ex.models;

/**
 * A POJO that should represent form data of our registration in our app
 *
 * username - the username the user wants to have
 * password - the password that the user wants
 * first_name - the first name of the user registering
 * last_name - the last name of the user registering
 *
 */
public class RegisterForm {
    private String username;
    private String password;
    private String last_name;
    private String first_name;

    public RegisterForm() {
    }

    public RegisterForm(String username, String password, String last_name, String first_name) {
        this.username = username;
        this.password = password;
        this.last_name = last_name;
        this.first_name = first_name;
    }

    @Override
    public String toString() {
        return "RegisterForm{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", last_name='" + last_name + '\'' +
                ", first_name='" + first_name + '\'' +
                '}';
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }
}
