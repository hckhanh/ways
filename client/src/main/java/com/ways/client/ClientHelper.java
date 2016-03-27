package com.ways.client;

import retrofit2.Retrofit;
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by Admin on 26/03/2016.
 */
public class ClientHelper {
    private static final ClientHelper CLIENT_HELPER = new ClientHelper();
    private static final String BASE_URL = "http://188.166.220.98:6789";

    private final Retrofit retrofit;

    private ClientHelper() {
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
                .build();
    }

    public static <T> T getService(Class<T> service) {
        return CLIENT_HELPER.retrofit.create(service);
    }
}
