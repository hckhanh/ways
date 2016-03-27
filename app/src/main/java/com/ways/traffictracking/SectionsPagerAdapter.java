package com.ways.traffictracking;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import com.ways.client.channel.Channel;
import com.ways.traffictracking.channel.PrivateChannelsFragment;
import com.ways.traffictracking.channel.PublicChannelsFragment;

import java.util.List;

/**
 * A {@link FragmentPagerAdapter} that returns a fragment corresponding to
 * one of the sections/tabs/pages.
 */
public class SectionsPagerAdapter extends FragmentPagerAdapter {
    private List<List<Channel>> channelsList;

    public SectionsPagerAdapter(FragmentManager fm, List<Channel> channels) {
        super(fm);
        ChannelListsFilter channelsFilter = new ChannelListsFilter(channels);
        this.channelsList = channelsFilter.getFilteredLists();
    }

    @Override
    public Fragment getItem(int position) {
        // getItem is called to instantiate the fragment for the given page.
        // Return a PlaceholderFragment (defined as a static inner class below).
        if (position == 0)
            return PublicChannelsFragment.newInstance(channelsList.get(position));
        else
            return PrivateChannelsFragment.newInstance(channelsList.get(position));
    }

    @Override
    public int getCount() {
        // Show 2 total pages.
        return 2;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        switch (position) {
            case 0:
                return "PUBLIC";
            case 1:
                return "PRIVATE";
        }
        return null;
    }
}
