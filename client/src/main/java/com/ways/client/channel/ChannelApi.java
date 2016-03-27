package com.ways.client.channel;

import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;
import rx.Observable;

/**
 * Created by Admin on 26/03/2016.
 */
interface ChannelApi {
    @GET("/channels")
    Observable<ChannelResponse> getChannels(@Header("sessionId") String sessionId);

    @GET("/channels/{id}")
    Observable<MessagesResponse> getMessages(@Path("id") String channelId);

    @POST("/channels/{id}")
    Observable<SendingResponse> sendMessage(@Path("id") String channelId, @Header("sessionId") String sessionId, @Body Message message);
}
