package com.ways.client.channel;

/**
 * Created by Admin on 27/03/2016.
 */
public class Location {
    private double longitude;

    private double latitude;

    public Location(double longitude, double latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public double getLatitude() {
        return latitude;
    }
}
