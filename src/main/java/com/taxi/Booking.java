package com.taxi;

public class Booking {
    private int bookingId;
    private int dropTime;
    private int charges;
    private Customer customer;

    public Booking(int bookingId, int dropTime, int charges, Customer c) {
        this.bookingId = bookingId;
        this.dropTime = dropTime;
        this.charges = charges;
        this.customer = c;
    }

    public int getBookingId() {
        return bookingId;
    }

    public int getDropTime() {
        return dropTime;
    }

    public int getCharges() {
        return charges;
    }

    public Customer getCustomer() {
        return customer;
    }
}
