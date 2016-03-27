package com.ways.client.channel;

import com.google.gson.annotations.SerializedName;
import com.ways.client.Response;

/**
 * Created by Admin on 27/03/2016.
 */
public class SendingResponse extends Response {
    @SerializedName("response")
    private Message messages;

    public Message getMessages() {
        return messages;
    }
}
