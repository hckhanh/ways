package com.ways.client.channel;

import com.ways.client.ClientHelper;

import java.util.List;

import rx.Observable;
import rx.android.schedulers.AndroidSchedulers;
import rx.functions.Func1;
import rx.schedulers.Schedulers;

/**
 * Created by Admin on 26/03/2016.
 */
public class ChannelService {
    private ChannelApi channelApi;

    public ChannelService() {
        channelApi = ClientHelper.getService(ChannelApi.class);
    }

    public Observable<List<Channel>> getChannels(String sessionId) {
        return channelApi.getChannels(sessionId).map(new Func1<ChannelResponse, List<Channel>>() {
            @Override
            public List<Channel> call(ChannelResponse channelResponse) {
                return channelResponse.response;
            }
        }).subscribeOn(Schedulers.newThread())
                .observeOn(AndroidSchedulers.mainThread());
    }

    public Observable<MessagesResponse> getMessages(String channelId) {
        return channelApi.getMessages(channelId).subscribeOn(Schedulers.newThread())
                .observeOn(AndroidSchedulers.mainThread());
    }

    public Observable<SendingResponse> sendMessage(String channelId, String sessionId, Message message) {
        return channelApi.sendMessage(channelId, sessionId, message).subscribeOn(Schedulers.newThread())
                .observeOn(AndroidSchedulers.mainThread());
    }
}
