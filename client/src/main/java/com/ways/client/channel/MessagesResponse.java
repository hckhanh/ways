package com.ways.client.channel;

import com.google.gson.annotations.SerializedName;
import com.ways.client.Response;

import java.util.List;

/**
 * Created by Admin on 27/03/2016.
 */
public class MessagesResponse extends Response {
    @SerializedName("response")
    private List<Message> messages;

    public List<Message> getMessages() {
        return messages;
    }
}
