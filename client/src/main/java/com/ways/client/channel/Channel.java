package com.ways.client.channel;

import com.google.gson.annotations.SerializedName;
import com.ways.client.User;

/**
 * Created by Admin on 26/03/2016.
 */
public class Channel {

    private
    @SerializedName("_id")
    String id;

    private String dateCreated;

    private String name;

    private ChannelType type;

    private User user;

    public String getId() {
        return id;
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public String getName() {
        return name;
    }

    public ChannelType getType() {
        return type;
    }

    public User getUser() {
        return user;
    }
}
