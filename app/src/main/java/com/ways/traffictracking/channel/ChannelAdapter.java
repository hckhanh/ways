package com.ways.traffictracking.channel;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.ways.client.channel.Channel;
import com.ways.traffictracking.R;

import java.util.List;

import butterknife.Bind;
import butterknife.ButterKnife;

/**
 * Created by Admin on 26/03/2016.
 */
public class ChannelAdapter extends RecyclerView.Adapter<ChannelAdapter.ChannelViewHolder> {
    private List<Channel> channels;
    private View.OnClickListener channelItemListener;

    public ChannelAdapter(List<Channel> channels, View.OnClickListener channelItemListener) {
        this.channels = channels;
        this.channelItemListener = channelItemListener;
    }

    @Override
    public ChannelViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View viewItem = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_channel, parent, false);
        viewItem.setOnClickListener(channelItemListener);

        return new ChannelViewHolder(viewItem);
    }

    @Override
    public void onBindViewHolder(ChannelViewHolder holder, int position) {
        Channel channel = channels.get(position);

        holder.channelName.setText(channel.getName());
        holder.channelCreatedTime.setText(channel.getDateCreated());
        holder.channelCreator.setText("Created by " + channel.getUser().getUsername());
    }

    @Override
    public int getItemCount() {
        return channels.size();
    }

    static class ChannelViewHolder extends RecyclerView.ViewHolder {
        @Bind(R.id.channelName)
        TextView channelName;

        @Bind(R.id.channelCreatedTime)
        TextView channelCreatedTime;

        @Bind(R.id.channelCreator)
        TextView channelCreator;

        public ChannelViewHolder(View itemView) {
            super(itemView);
            ButterKnife.bind(this, itemView);
        }
    }
}
