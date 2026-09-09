## Deployment

- **Check it out at:** https://spike-city-frontend.onrender.com/


#### Iteration 3
Our Volleyball Application is complete! It is a fully functional, interactive tool we use to keep track of our volleyball league. We had a blast designing it, taking inspiration from the classic ’80s Miami Vice/Vice City aesthetic!

The Home page is open for everyone to view, but other functionality is protected behind two levels of permission: the Events page is accessible to logged-in users, while the Admin page is reserved for admins only. Reach out to us if you’d like admin privileges!

Although development is complete, we will continue updating and adding features to our app. Feel free to contact us with any questions or feedback!


---
## Iteration 3 Screenshots
<img width="2541" height="1328" alt="Screenshot 2025-08-12 at 22 03 43" src="https://github.com/user-attachments/assets/f6aab6b9-5a3c-42ca-b014-292996495bbf" />
<img width="1885" height="1323" alt="Screenshot 2025-08-12 at 22 01 48" src="https://github.com/user-attachments/assets/b45fe009-1f63-4a5c-a132-2382ca6874d3" />
<img width="1885" height="1323" alt="Screenshot 2025-08-12 at 22 02 27" src="https://github.com/user-attachments/assets/ea787828-b941-40e8-a0d3-18ea4e9b3330" />
<img width="1885" height="1323" alt="Screenshot 2025-08-12 at 22 02 02" src="https://github.com/user-attachments/assets/d4a36bb4-da04-4278-9252-43bc5b0df48c" />



---
## Iteration 2 Screenshots
<img width="2560" height="1349" alt="Screenshot 2025-08-08 at 20 53 23" src="https://github.com/user-attachments/assets/7ae135af-7bc3-4562-b63d-90e7945270fa" />
<img width="2560" height="1349" alt="Screenshot 2025-08-08 at 20 52 35" src="https://github.com/user-attachments/assets/2ea42f1b-a05d-4e7f-988d-7662173981b4" />
<img width="1459" height="546" alt="Screenshot 2025-08-08 at 20 53 55" src="https://github.com/user-attachments/assets/acb7d773-482c-463e-b36d-d61a661095b3" />
<img width="2560" height="1349" alt="Screenshot 2025-08-08 at 20 52 42" src="https://github.com/user-attachments/assets/35750576-31cc-40a3-aa6b-5d93cc3a3fcd" />




## Iteration 1 Screenshots
<img width="2560" height="1440" alt="Screenshot 2025-08-01 at 21 30 24" src="https://github.com/user-attachments/assets/fe8464c3-0c62-4431-b47c-6895865d9d23" />
<img width="2560" height="1440" alt="Screenshot 2025-08-01 at 21 30 47" src="https://github.com/user-attachments/assets/8c1a8aba-817c-42c9-a1ee-028f4c84f231" />
<img width="1312" height="1032" alt="Screenshot 2025-08-01 at 21 31 04" src="https://github.com/user-attachments/assets/50680cd9-a6ed-415d-bb0a-f57f59bdc6e6" />
<img width="1370" height="496" alt="Screenshot 2025-08-01 at 21 31 22" src="https://github.com/user-attachments/assets/e0f7dc27-f120-4d2e-a352-c4f81ce0cfde" />
<img width="1370" height="1440" alt="Screenshot 2025-08-01 at 21 31 30" src="https://github.com/user-attachments/assets/8f862e1a-f17f-4d63-85e1-38659e5201eb" />
<img width="1370" height="751" alt="Screenshot 2025-08-01 at 21 31 49" src="https://github.com/user-attachments/assets/dbc9d419-a609-4788-9425-2d1789372331" />

## Some Data for Local Testing
[check.json.zip](https://github.com/user-attachments/files/21556039/check.json.zip)

## Sources for the fonts we used:
Pricedown - https://www.gta-sanandreas.com/downloads/#google_vignette
Respondent - https://www.dafont.com/respondent.font




## Contributions
### Jordan Glass – glass.jo@northeastern.edu

#### Iteration 1
- Configured the application to have a homepage, event page, and admin page  
- Added an admin route  
- Added custom `Event` component  
- Added custom `EventsList` component  
- Added a dropdown menu to admin page allowing user to render create, update, and delete forms  
- Created an **AdminDataService** and hooked up CRUD components to it  
- Implemented delete, create, and update logic in the admin controller and `EventsDAO`  
- Extracted all form-handling and data-fetch logic into reusable custom hooks  
- Styled the admin dropdown using React-Bootstrap  
- Implemented an **EventDetails** page that:  
  - Displays full event data  
  - Allows RSVP toggling  
  - Adds the event to Google Calendar via a generated link  
- Deployed both frontend and backend to App Engine

#### Iteration 2
- Added additional logic to the backend to enusre the event number field remains type `Number`
- Added logic in the `UseEventsList.js` file to ensure the `getEvents` service is always called with a user id
  rather than an entire user object
- Fixed a bug in the backend where CORS was using the wrong front end url, fixing deployment
- Complete overhaul of the application ui, fully styled the homepage, events page, events details page, 
  and admin page

#### Iteration 3
- Created a `mockServer.js` file with dummy data for testing
- Wrote components tests to verify the following core components are being rendered properly:
    - `ViewAdmin`
    - `App`
    - `EventList`
    - `EventDetails`
- Added end-to-end tests for the Events API covering GET, POST, PUT, and DELETE endpoints
- Added javaodoc style comments
- Fixed rendering of countdown on mobile version
- Fixed a error where events in eventsList did not always have a unique id
- Fixed a bug where adding a new event number was sometimes a string
- Fixed a bug where updating an events time but not date would default to a different date 
- Made style more consistent in terms of spacing, shapes and colors
- Updated navbar style

### Gyula Planky – planky.g@northeastern.edu

#### Iteration 1
- Added inline comments throughout frontend and backend code  
- Added “pre-events” filter logic  
- Integrated and styled an interactive calendar on the landing page  
- Made calendar dates clickable to navigate to the relevant event page  
- Fixed routing bugs and updated “Back” navigation  
- Generated prototype JSON data for early testing  
- Added a countdown timer to the next volleyball meetup  
- Created flip-card UI for the “About Us” section with social links  
- Added team photo and organized landing page layout  
- Added client-side validation for create and update event forms  
- Implemented “Add to Google Calendar” button  
- Deployed to:  
  - [https://volleyball-app-frontend-mk1.uw.r.appspot.com](https://volleyball-app-frontend-mk1.uw.r.appspot.com)  
  - [https://volleyball-app-backend.uw.r.appspot.com](https://volleyball-app-backend.uw.r.appspot.com)  
#### Iteration 2 
- Created designed and implemented new logo for our application
- Designed, created, and implemented a new custom logo
- Added in-place notification system with popup banner and bell icon alerts
-	Implemented hook to manage alert state separately from other data
-	Enabled real-time notifications for changes to events a user is attending
-	Fixed attendee count bug on event details page for immediate updates
-	Added design enhancements to improve visual appeal and consistency
-	Restricted admin page access to approved admin users only
#### Iteration 3 
- Created designed and implemented new logo for our application
- Added admin tester user 
- Updated index page so it is partially available for people to see even if not logged in user
- Added fonts to overhaul design 
- Updated navbar with new logo and new design 
- Updated index page with new design
- Updated headers 
- Updated flip cards for devs
- Created new mock data to better reflect functionality 
- Redeployed
- Updated README
