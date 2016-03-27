package com.ways.client.user;

import com.ways.client.ClientHelper;
import com.ways.client.Response;
import com.ways.client.User;

import rx.Observable;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;


/**
 * Created by Admin on 26/03/2016.
 */
public class UserService {
    private UserApi userApi;

    public UserService() {
        this.userApi = ClientHelper.getService(UserApi.class);
    }

    public Observable<UserResponse> login(User user) {
        return userApi.login(user).subscribeOn(Schedulers.newThread())
                .observeOn(AndroidSchedulers.mainThread());
    }

    public Observable<Response> logout(String sessionId) {
        return userApi.logout(sessionId).subscribeOn(Schedulers.newThread())
                .observeOn(AndroidSchedulers.mainThread());
    }
}
