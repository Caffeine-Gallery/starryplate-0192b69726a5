import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor Restaurant {
  // Types
  type MenuItem = {
    name: Text;
    description: Text;
    price: Nat;
  };

  type Reservation = {
    name: Text;
    email: Text;
    date: Text;
    time: Text;
    guests: Nat;
  };

  // Restaurant data
  let about : Text = "Our Michelin-starred restaurant offers an exquisite dining experience with innovative cuisine and impeccable service.";
  
  stable var menuItems : [MenuItem] = [
    { name = "Truffle Risotto"; description = "Creamy Arborio rice with black truffles"; price = 35 },
    { name = "Wagyu Beef"; description = "A5 Japanese Wagyu with seasonal vegetables"; price = 85 },
    { name = "Lobster Thermidor"; description = "Succulent lobster in a rich cream sauce"; price = 65 }
  ];

  stable var pictures : [Text] = [
    "restaurant-interior.jpg",
    "signature-dish.jpg",
    "chef-portrait.jpg"
  ];

  stable var reservations : [Reservation] = [];

  // Query calls
  public query func getAbout() : async Text {
    about
  };

  public query func getMenu() : async [MenuItem] {
    menuItems
  };

  public query func getPictures() : async [Text] {
    pictures
  };

  // Update calls
  public func makeReservation(name: Text, email: Text, date: Text, time: Text, guests: Nat) : async () {
    let newReservation : Reservation = {
      name = name;
      email = email;
      date = date;
      time = time;
      guests = guests;
    };
    reservations := Array.append(reservations, [newReservation]);
    Debug.print("New reservation made for " # name);
  };
}
