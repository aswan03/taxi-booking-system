package com.taxi;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        Customer c1 = new Customer(1, 'A', 'B', 1);
        Customer c2 = new Customer(2, 'A', 'D', 4);
        Customer c3 = new Customer(3, 'B', 'A', 10);
        Customer c4 = new Customer(4, 'A', 'C', 8);
        Customer c5 = new Customer(5, 'B', 'A', 1);

        BookingSystem bookingSystem = new BookingSystem(3);

        bookingSystem.bookTaxi(c1);
        bookingSystem.bookTaxi(c2);
        bookingSystem.bookTaxi(c3);
        bookingSystem.bookTaxi(c4);
        bookingSystem.bookTaxi(c5);
        //

        bookingSystem.displayTaxi();
    }
}