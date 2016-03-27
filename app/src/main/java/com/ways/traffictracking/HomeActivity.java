package com.ways.traffictracking;

import android.app.ProgressDialog;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.NavigationView;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TabLayout;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.GravityCompat;
import android.support.v4.view.ViewPager;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

import com.ways.client.Response;
import com.ways.client.User;
import com.ways.client.channel.Channel;
import com.ways.client.channel.ChannelService;
import com.ways.client.user.UserService;

import java.util.List;

import butterknife.Bind;
import butterknife.ButterKnife;
import rx.functions.Action1;

public class HomeActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    @Bind(R.id.drawer_layout)
    DrawerLayout drawer;

    @Bind(R.id.container)
    ViewPager viewPager;

    TextView headerUsername;

    TextView headerEmail;

    MenuItem logoutMenuItem;

    ProgressDialog progressDialog;

    /**
     * The {@link android.support.v4.view.PagerAdapter} that will provide
     * fragments for each of the sections. We use a
     * {@link FragmentPagerAdapter} derivative, which will keep every
     * loaded fragment in memory. If this becomes too memory intensive, it
     * may be best to switch to a
     * {@link android.support.v4.app.FragmentStatePagerAdapter}.
     */
    private SectionsPagerAdapter sectionsPagerAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        ButterKnife.bind(this);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        progressDialog = new ProgressDialog(this);
        progressDialog.setMessage("Loading...");
        progressDialog.setIndeterminate(true);
        progressDialog.setCancelable(false);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        setupNavigationDrawer(toolbar);
    }

    @Override
    protected void onStart() {
        super.onStart();
        loadChannels();
    }

    private void loadChannels() {
        progressDialog.show();

        User user = loadUser();
        String username = user.getUsername();

        if (username != null) {
            headerUsername.setText(username);
            headerEmail.setText(user.getEmail());
        } else {
            headerUsername.setText("Anonymous");
            logoutMenuItem.setEnabled(false);
        }

        ChannelService channelService = new ChannelService();
        channelService.getChannels(user.getSessionId()).subscribe(new Action1<List<Channel>>() {
            @Override
            public void call(List<Channel> channels) {
                setupTabLayout(channels);
                progressDialog.hide();
            }
        }, new Action1<Throwable>() {
            @Override
            public void call(Throwable throwable) {
                Log.e("HomeActivity", "Error", throwable);
            }
        });
    }

    private User loadUser() {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        String sessionId = sharedPreferences.getString(Const.SESSION_ID, null);
        String username = sharedPreferences.getString(Const.USERNAME, null);
        String email = sharedPreferences.getString(Const.USER_EMAIL, null);

        User user = new User();
        user.setSessionId(sessionId);
        user.setUsername(username);
        user.setEmail(email);

        return user;
    }

    private void setupTabLayout(List<Channel> channels) {
        // Create the adapter that will return a fragment for each of the three
        // primary sections of the activity.
        sectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager(), channels);

        // Set up the ViewPager with the sections adapter.
        viewPager.setAdapter(sectionsPagerAdapter);

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);
        tabLayout.setupWithViewPager(viewPager);
    }

    private void setupNavigationDrawer(Toolbar toolbar) {
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        Menu menu = navigationView.getMenu();
        View headerView = navigationView.getHeaderView(0);

        logoutMenuItem = menu.findItem(R.id.nav_logout);
        headerUsername = ButterKnife.findById(headerView, R.id.nav_header_username);
        headerEmail = ButterKnife.findById(headerView, R.id.nav_header_email);
        navigationView.setNavigationItemSelectedListener(this);
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.home, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_channels) {
            // Handle the camera action
        } else if (id == R.id.nav_settings) {

        } else if (id == R.id.nav_logout) {
            User user = loadUser();
            UserService userService = new UserService();

            progressDialog.setMessage("Logging out");
            progressDialog.show();
            userService.logout(user.getSessionId()).subscribe(new Action1<Response>() {
                @Override
                public void call(Response response) {
                    viewPager.setCurrentItem(0);
                    Snackbar.make(viewPager, "Logged out", Snackbar.LENGTH_SHORT).show();
                    deleteUser();
                    progressDialog.hide();
                }
            });
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    private void deleteUser() {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        sharedPreferences
                .edit()
                .remove(Const.SESSION_ID)
                .remove(Const.USERNAME)
                .remove(Const.USER_EMAIL)
                .apply();

        headerUsername.setText("Anonymous");
        headerEmail.setText("");
        logoutMenuItem.setEnabled(false);
    }

}
