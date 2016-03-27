package com.ways.traffictracking;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;

import java.util.ArrayList;
import java.util.List;

import butterknife.Bind;
import butterknife.ButterKnife;

public class ScrollingActivityViewChannel extends AppCompatActivity {

    @Bind(R.id.channelList)
    RecyclerView channelRecylerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scrolling_activity_view_channel);
        ButterKnife.bind(this);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        setupChannelList();
    }

    private void setupChannelList() {
        List<String> channels = new ArrayList<>();
        channels.add("Quan 1");
        channels.add("Quan 2");
        channels.add("Quan 3");
        channels.add("Quan 4");
        channels.add("Quan 5");
        channels.add("Quan 6");
        channels.add("Quan 7");
        channels.add("Quan Go Vap");
        channels.add("Quan Phu Nhuan");
        channels.add("Quan 1");
        channels.add("Quan 2");
        channels.add("Quan 3");
        channels.add("Quan 4");
        channels.add("Quan 5");
        channels.add("Quan 6");
        channels.add("Quan 7");
        channels.add("Quan Go Vap");
        channels.add("Quan Phu Nhuan");
        channels.add("Quan 1");
        channels.add("Quan 2");
        channels.add("Quan 3");
        channels.add("Quan 4");
        channels.add("Quan 5");
        channels.add("Quan 6");
        channels.add("Quan 7");
        channels.add("Quan Go Vap");
        channels.add("Quan Phu Nhuan");
        channels.add("Quan 1");
        channels.add("Quan 2");
        channels.add("Quan 3");
        channels.add("Quan 4");
        channels.add("Quan 5");
        channels.add("Quan 6");
        channels.add("Quan 7");
        channels.add("Quan Go Vap");
        channels.add("Quan Phu Nhuan");

//        ChannelAdapter channelListAdapter = new ChannelAdapter(channels);
//        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
//
//        channelRecylerView.setHasFixedSize(true);
//        channelRecylerView.setNestedScrollingEnabled(false);
//        channelRecylerView.setLayoutManager(linearLayoutManager);
//        channelRecylerView.setAdapter(channelListAdapter);
    }
}
