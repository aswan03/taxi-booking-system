package com.taxi;

import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingSystem {
    private List<Taxi> taxis = new ArrayList<>();
    private int bookingId = 1;

    public BookingSystem() {
    }

    public BookingSystem(int numberOfTaxis) {
        for (int i = 1; i <= numberOfTaxis; i++) {
            taxis.add(new Taxi(i));
        }
    }

    @PostConstruct
    public void init() {
        if (taxis.isEmpty()) {
            System.out.println("Initializing default taxi fleet (4 taxis)...");
            int taxiCount = 4;
            for (int i = 1; i <= taxiCount; i++) {
                taxis.add(new Taxi(i));
            }
        } else {
            System.out.println("Taxi fleet already initialized with " + taxis.size() + " taxis.");
        }
    }

    // Calculate the charges
    private int calculateCharges(char pickup, char drop) {
        int distance = Math.abs(pickup - drop) * 15;
        int charges = 100; // Base charge
        charges += distance * 10;
        return charges;
    }

    // find the freeTaxis
    public Taxi findTaxi(char pickup, int pickTime) {
        System.out.println("Checking availability for pickup at " + pickup + " at time " + pickTime);
        System.out.println("Total taxis in fleet: " + taxis.size());

        List<Taxi> freeTaxis = new ArrayList<>();
        for (Taxi t : taxis) {
            if (t.getFreeTime() <= pickTime) {
                freeTaxis.add(t);
            } else {
                System.out.println("Taxi " + t.getTaxiId() + " is busy until " + t.getFreeTime());
            }
        }

        if (freeTaxis.isEmpty()) {
            System.out.println("No free taxis found for given pickTime.");
            return null;
        }

        // Find closest taxi
        int minDistance = Integer.MAX_VALUE;
        for (Taxi t : freeTaxis) {
            int distance = Math.abs(pickup - t.getCurrentSpot());
            minDistance = Math.min(minDistance, distance);
        }

        List<Taxi> closest = new ArrayList<>();
        for (Taxi t : freeTaxis) {
            int distance = Math.abs(pickup - t.getCurrentSpot());
            if (distance == minDistance) {
                closest.add(t);
            }
        }

        Taxi selected = closest.get(0);

        // Assign by earnings (lower earnings first)
        for (Taxi t : closest) {
            if (t.getEarnings() < selected.getEarnings() ||
                    (t.getEarnings() == selected.getEarnings() &&
                            t.getTaxiId() < selected.getTaxiId())) {
                selected = t;
            }
        }
        return selected;
    }

    public synchronized String bookTaxi(int customerId, char pickup, char drop, int pickTime) {
        if (pickup < 'A' || pickup > 'F' || drop < 'A' || drop > 'F') {
            return "Invalid location. Please use A-F.";
        }

        Taxi selected = findTaxi(pickup, pickTime);
        if (selected == null) {
            if (taxis.isEmpty()) {
                return "No Taxi Available (System Error: Fleet not initialized)";
            }
            return "No Taxi Available (All taxis are currently busy at " + pickTime + ")";
        }

        int travelTime = Math.abs(pickup - drop); // Simplified travel time
        int dropTime = pickTime + travelTime;
        int charges = calculateCharges(pickup, drop);

        Customer customer = new Customer(customerId, pickup, drop, pickTime);
        Booking booking = new Booking(bookingId++, dropTime, charges, customer);

        selected.assignBookings(booking);
        selected.setFreeTime(dropTime);
        selected.setEarnings(selected.getEarnings() + charges);
        selected.setCurrentSpot(drop);

        return "Taxi " + selected.getTaxiId() + " is allocated";
    }

    public String bookTaxi(Customer customer) {
        return bookTaxi(customer.getCustomerId(), customer.getPickup(), customer.getDrop(), customer.getPickTime());
    }

    public void displayTaxi() {
        System.out.println("--------------------------------------");
        System.out.println("Taxi Details:");
        for (Taxi t : taxis) {
            System.out.println("Taxi-" + t.getTaxiId() + " Total Earnings: " + t.getEarnings() + ", Current Spot: "
                    + t.getCurrentSpot() + ", Free Time: " + t.getFreeTime());
        }
        System.out.println("--------------------------------------");
    }

    public List<Taxi> getTaxis() {
        return taxis;
    }
}
