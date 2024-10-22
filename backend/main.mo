import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor Steakhouse {
  // Types
  type MenuItem = {
    name: Text;
    description: Text;
    price: Nat;
    category: Text;
  };

  type Reservation = {
    name: Text;
    email: Text;
    date: Text;
    time: Text;
    guests: Nat;
  };

  type GalleryImage = {
    url: Text;
    category: Text;
    description: Text;
  };

  // Restaurant data
  let about : Text = "Welcome to Prime Cut Steakhouse, where we serve the finest quality steaks in a sophisticated and warm atmosphere. Our expert chefs prepare each cut to perfection, ensuring a memorable dining experience for all our guests.";
  
  stable var menuItems : [MenuItem] = [
    { name = "Filet Mignon"; description = "8oz tender, lean cut of beef"; price = 45; category = "Steaks" },
    { name = "Ribeye"; description = "12oz well-marbled, flavorful steak"; price = 50; category = "Steaks" },
    { name = "New York Strip"; description = "10oz classic cut with a fine texture"; price = 48; category = "Steaks" },
    { name = "Porterhouse"; description = "24oz king of steaks, perfect for sharing"; price = 75; category = "Steaks" },
    { name = "Wagyu Sirloin"; description = "8oz premium Japanese beef"; price = 85; category = "Steaks" },
    { name = "Lobster Tail"; description = "6oz broiled lobster tail"; price = 40; category = "Seafood" },
    { name = "Grilled Salmon"; description = "Fresh Atlantic salmon with lemon butter"; price = 32; category = "Seafood" },
    { name = "Shrimp Scampi"; description = "Jumbo shrimp in garlic white wine sauce"; price = 30; category = "Seafood" },
    { name = "Stuffed Mushrooms"; description = "Mushroom caps filled with crab meat"; price = 15; category = "Appetizers" },
    { name = "Beef Carpaccio"; description = "Thinly sliced raw beef with arugula and parmesan"; price = 18; category = "Appetizers" },
    { name = "Caesar Salad"; description = "Classic salad with romaine lettuce and croutons"; price = 12; category = "Salads" },
    { name = "Wedge Salad"; description = "Iceberg lettuce with blue cheese dressing and bacon"; price = 14; category = "Salads" },
    { name = "Baked Potato"; description = "Large potato with butter and sour cream"; price = 8; category = "Sides" },
    { name = "Creamed Spinach"; description = "Rich and creamy spinach side dish"; price = 10; category = "Sides" },
    { name = "Truffle Mac and Cheese"; description = "Decadent mac and cheese with truffle oil"; price = 12; category = "Sides" },
    { name = "New York Cheesecake"; description = "Classic creamy cheesecake"; price = 12; category = "Desserts" },
    { name = "Chocolate Lava Cake"; description = "Warm chocolate cake with a molten center"; price = 14; category = "Desserts" }
  ];

  stable var galleryImages : [GalleryImage] = [
    { url = "cow-grazing.jpg"; category = "Ranch"; description = "Cows grazing on lush green pastures" },
    { url = "ranch-landscape.jpg"; category = "Ranch"; description = "Scenic view of our partner ranch" },
    { url = "cattle-herd.jpg"; category = "Ranch"; description = "A herd of premium cattle" },
    { url = "raw-beef-cuts.jpg"; category = "Beef"; description = "Various cuts of raw beef" },
    { url = "marbled-beef.jpg"; category = "Beef"; description = "Close-up of beautifully marbled beef" },
    { url = "dry-aged-beef.jpg"; category = "Beef"; description = "Our dry-aging process for beef" },
    { url = "grilled-steak.jpg"; category = "Steak"; description = "Perfectly grilled steak" },
    { url = "steak-platter.jpg"; category = "Steak"; description = "Assortment of our signature steaks" },
    { url = "steak-preparation.jpg"; category = "Steak"; description = "Chef preparing a steak in the kitchen" },
    { url = "steakhouse-interior.jpg"; category = "Restaurant"; description = "Elegant interior of our steakhouse" },
    { url = "chef-portrait.jpg"; category = "Restaurant"; description = "Our head chef at work" },
    { url = "wine-selection.jpg"; category = "Restaurant"; description = "Our extensive wine collection" }
  ];

  stable var reservations : [Reservation] = [];

  // Query calls
  public query func getAbout() : async Text {
    about
  };

  public query func getMenu() : async [MenuItem] {
    menuItems
  };

  public query func getGalleryImages() : async [GalleryImage] {
    galleryImages
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
