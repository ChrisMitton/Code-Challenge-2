# Christian Mitton's submission for DRL

## Part 1 - Theoretical Unter data model
### Question 1:
- Considerations and Assumptions:
  - There can be multiple passengers in a ride, but only 1 person can give a rating
  - Drivers can have multiple shifts
  - A drivers activity is tracked daily
- Database Tables:
  - Driver (information about drivers)
    - driver id
    - name
    - contact information
    - Rating
    - total revenue
    - total tips
    - total rides
  - Passenger (information about passengers)
    - passenger id
    - name
    - contact information
  - Rating (information about accumulated average rating of each driver)
    - driver id
    - total number of ratings
    - total number of stars
    - average rating
  - Shift (information about shifts drivers work)
    - shift id
    - driver id
    - start time
    - end time
    - date 
  - Ride (information about rides a driver gives a passenger(s))
    - ride id
    - driver id
    - passenger id
    - shift id
    - start time
    - end time
    - number of passengers
    - mileage
    - ride length
    - trip cost
    - tip

### Question 2:
- Considerations and Assumptions:
  - Using the same tables, but the passenger and ratings table would change.
  - Ratings would now be applicable to both driver and passanger.
- Changed tables:
  - Passanger
    - passenger id
    - name
    - contact information
    - Rating
  - Rating
    - rater id (can be either passanger or driver. Whoever did the rating.)
    - rated id (can be either passanger or driver. Whoever was rated.)
    - total number of ratings
    - total number of stars
    - average rating
