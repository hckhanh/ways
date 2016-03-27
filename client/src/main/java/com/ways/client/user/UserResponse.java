package com.ways.client.user;

import com.google.gson.annotations.SerializedName;
import com.ways.client.Response;
import com.ways.client.User;

/**
 * Created by Admin on 26/03/2016.
 */
public class UserResponse extends Response {
    @SerializedName("response")
    private User user;

    public User getUser() {
        return user;
    }
}
