package com.taxi;

import java.util.ArrayList;
import java.util.List;

public class Taxi {
    private int taxiId;
    private char currentSpot;
    private int freeTime;
    private int earnings;
    private List<Booking> bookings;

    public Taxi(int taxiId) {
        this.taxiId = taxiId;
        this.currentSpot = 'A';
        this.freeTime = 0;
        this.bookings = new ArrayList<>();
        this.earnings = 0;
    }

    public int getTaxiId() {
        return taxiId;
    }

    public void setTaxiId(int taxiId) {
        this.taxiId = taxiId;
    }

    public char getCurrentSpot() {
        return currentSpot;
    }

    public void setCurrentSpot(char currentSpot) {
        this.currentSpot = currentSpot;
    }

    public int getFreeTime() {
        return freeTime;
    }

    public void setFreeTime(int freeTime) {
        this.freeTime = freeTime;
    }

    public int getEarnings() {
        return earnings;
    }

    public void setEarnings(int earnings) {
        this.earnings = earnings;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public boolean isFree(char pickup, int pickTime) {
        return freeTime <= pickTime;
    }

    public void assignBookings(Booking booking) {
        this.bookings.add(booking);
    }
}
