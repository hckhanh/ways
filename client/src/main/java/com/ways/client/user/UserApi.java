package com.ways.client.user;

import com.ways.client.Response;
import com.ways.client.User;

import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import rx.Observable;

/**
 * Created by Admin on 26/03/2016.
 */
interface UserApi {
    @POST("/users/login")
    Observable<UserResponse>
    login(@Body User user);

    @GET("/users/logout")
    Observable<Response>
    logout(@Header("sessionId") String sessionId);
}
