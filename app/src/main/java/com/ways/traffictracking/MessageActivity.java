package com.ways.traffictracking;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.widget.EditText;
import android.widget.ImageButton;

import com.ways.client.channel.ChannelService;
import com.ways.client.channel.Message;
import com.ways.client.channel.MessagesResponse;
import com.ways.client.channel.SendingResponse;

import butterknife.Bind;
import butterknife.ButterKnife;
import butterknife.OnClick;
import rx.functions.Action1;

public class MessageActivity extends AppCompatActivity {
    @Bind(R.id.message_recycler_view)
    RecyclerView messageList;

    @Bind(R.id.message_input)
    EditText messageInput;

    @Bind(R.id.btn_post_message)
    ImageButton btnPostMessage;

    private String sessionId;
    private MessagesAdapter messageAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_message);
        ButterKnife.bind(this);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        setupPostingMessage();
    }

    private void setupPostingMessage() {
        sessionId = getSessionId();
        if (sessionId != null) {
            messageInput.setText("");
            messageInput.setEnabled(true);
            btnPostMessage.setEnabled(true);
        } else {
            messageInput.setText("Login is required for submitting");
            messageInput.setEnabled(false);
            btnPostMessage.setEnabled(false);
        }
    }

    @Override
    protected void onStart() {
        super.onStart();
        setupRecyclerView();
    }

    private void setupRecyclerView() {
        String channelId = getIntent().getStringExtra(Const.CHANNEL_ID);
        ChannelService channelService = new ChannelService();
        channelService.getMessages(channelId).subscribe(new Action1<MessagesResponse>() {
            @Override
            public void call(MessagesResponse messagesResponse) {
                if (messagesResponse.getCode() == 1) {
                    messageAdapter = new MessagesAdapter(messagesResponse.getMessages());
                    LinearLayoutManager linearLayoutManager = new LinearLayoutManager(MessageActivity.this);

                    messageList.setHasFixedSize(true);
                    messageList.setNestedScrollingEnabled(false);
                    messageList.setLayoutManager(linearLayoutManager);
                    messageList.setAdapter(messageAdapter);
                }
            }
        });
    }

    public String getSessionId() {
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        return sharedPreferences.getString(Const.SESSION_ID, null);
    }

    @OnClick(R.id.btn_post_message)
    public void onSendMessageClick() {
        Message message = new Message();
        message.setContent(messageInput.getText().toString());

        ChannelService channelService = new ChannelService();
        channelService.sendMessage(getChannelId(), sessionId, message).subscribe(new Action1<SendingResponse>() {
            @Override
            public void call(SendingResponse sendingResponse) {
                messageAdapter.addMessage(sendingResponse.getMessages());
                messageAdapter.notifyItemInserted(messageAdapter.getItemCount());
                messageInput.setText("");
            }
        });
    }

    public String getChannelId() {
        return getIntent().getStringExtra(Const.CHANNEL_ID);
    }
}
