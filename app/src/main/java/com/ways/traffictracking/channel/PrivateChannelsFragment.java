package com.ways.traffictracking.channel;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.ways.client.channel.Channel;
import com.ways.traffictracking.LoginActivity;
import com.ways.traffictracking.R;

import java.util.List;

import butterknife.ButterKnife;
import butterknife.OnClick;

/**
 * Created by Admin on 26/03/2016.
 */
public class PrivateChannelsFragment extends PublicChannelsFragment {
    /**
     * Returns a new instance of this fragment for the given section
     * number.
     */
    public static PublicChannelsFragment newInstance(List<Channel> channels) {
        PrivateChannelsFragment fragment = new PrivateChannelsFragment();
        fragment.setChannels(channels);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        if (channels != null && !channels.isEmpty())
            return super.onCreateView(inflater, container, savedInstanceState);
        else {
            View rootView = inflater.inflate(R.layout.private_empty_tap, container, false);
            ButterKnife.bind(this, rootView);
            return rootView;
        }
    }

    @OnClick(R.id.private_channel_btn_login)
    public void onBtnLoginClick() {
        Intent loginIntent = new Intent(getContext(), LoginActivity.class);
        startActivity(loginIntent);
    }
}
