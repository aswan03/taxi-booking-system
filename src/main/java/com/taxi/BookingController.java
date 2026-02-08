package com.taxi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class BookingController {

    @Autowired
    private BookingSystem bookingSystem;

    @PostMapping("/book")
    public String bookTaxi(@RequestBody BookingRequest request) {
        // Convert string locations to char if needed, assuming input is "A", "B", etc.
        char pickup = request.getPickup().charAt(0);
        char drop = request.getDrop().charAt(0);
        return bookingSystem.bookTaxi(request.getCustomerId(), pickup, drop, request.getPickTime());
    }

    @GetMapping("/taxis")
    public List<Taxi> getTaxis() {
        return bookingSystem.getTaxis();
    }
}

class BookingRequest {
    private int customerId;
    private String pickup;
    private String drop;
    private int pickTime;

    // Getters and Setters
    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getPickup() {
        return pickup;
    }

    public void setPickup(String pickup) {
        this.pickup = pickup;
    }

    public String getDrop() {
        return drop;
    }

    public void setDrop(String drop) {
        this.drop = drop;
    }

    public int getPickTime() {
        return pickTime;
    }

    public void setPickTime(int pickTime) {
        this.pickTime = pickTime;
    }
}
