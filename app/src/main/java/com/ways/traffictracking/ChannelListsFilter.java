package com.ways.traffictracking;

import com.ways.client.channel.Channel;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Admin on 26/03/2016.
 */
public class ChannelListsFilter {

    private List<Channel> channels;

    public ChannelListsFilter(List<Channel> channels) {
        this.channels = channels;
    }

    public List<List<Channel>> getFilteredLists() {
        List<Channel> publicChannels = new ArrayList<>();
        List<Channel> privateChannels = new ArrayList<>();

        for (Channel channel : channels) {
            switch (channel.getType()) {
                case PUBLIC:
                    publicChannels.add(channel);
                    break;
                case PRIVATE:
                    privateChannels.add(channel);
                    break;
            }
        }

        List<List<Channel>> listOfListChannels = new ArrayList<>();
        listOfListChannels.add(publicChannels);
        listOfListChannels.add(privateChannels);

        return listOfListChannels;
    }
}
