package com.ways.traffictracking.channel;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.ways.client.channel.Channel;
import com.ways.traffictracking.Const;
import com.ways.traffictracking.MessageActivity;
import com.ways.traffictracking.R;

import java.util.List;

import butterknife.Bind;
import butterknife.ButterKnife;

/**
 * A placeholder fragment containing a simple view.
 */
public class PublicChannelsFragment extends Fragment implements View.OnClickListener {
    protected List<Channel> channels;

    @Nullable
    @Bind(R.id.channel_list)
    RecyclerView channelList;

    /**
     * Returns a new instance of this fragment for the given section
     * number.
     */
    public static PublicChannelsFragment newInstance(List<Channel> channels) {
        PublicChannelsFragment fragment = new PublicChannelsFragment();
        fragment.setChannels(channels);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.channel_tab, container, false);
        ButterKnife.bind(this, rootView);

        ChannelAdapter channelAdapter = new ChannelAdapter(channels, this);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(getContext());

        channelList.setHasFixedSize(true);
        channelList.setNestedScrollingEnabled(false);
        channelList.setLayoutManager(linearLayoutManager);
        channelList.setAdapter(channelAdapter);

        return rootView;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        ButterKnife.unbind(this);
    }

    public void setChannels(List<Channel> channels) {
        this.channels = channels;
    }

    @Override
    public void onClick(View v) {
        ChannelAdapter.ChannelViewHolder channelViewHolder = new ChannelAdapter.ChannelViewHolder(v);
        Channel selectChannel = null;
        for (Channel channel : channels) {
            if (channel.getName().equals(channelViewHolder.channelName.getText())) {
                selectChannel = channel;
                break;
            }
        }

        if (selectChannel != null) {
            openMessageActivity(selectChannel.getId());
        }
    }

    private void openMessageActivity(String channelId) {
        Intent messageIntent = new Intent(getContext(), MessageActivity.class);
        messageIntent.putExtra(Const.CHANNEL_ID, channelId);
        startActivity(messageIntent);
    }
}
