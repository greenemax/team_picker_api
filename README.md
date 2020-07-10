### Wireframe https://imgur.com/nA9u7lk

### ERD: https://imgur.com/a/z0bmUQc

### Front End Application Screenshot: https://imgur.com/wf2aQpo

### Installation Instructions for both Client and API:
1. Fork Repository
2. Clone Repository locally on your computer
3. Switch into the Repo on the command line
4. Enter "npm install", confirm that this finishes with success.
5. Enter "npm install lodash", confirm that this finishes with success.
6. Enter "npm run server" to access the local API
7. Enter "npm start" to access local Client

### Dream Team Back-End API

Dream Team is a full stack roster-building application that allows users to authenticate, add players to a lineup, and confirm their custom choices against the parameters set within the app.

## Repositories
Client: [Client](https://github.com/greenemax/team_picker_client)
API: [API](https://github.com/greenemax/team_picker_api)


## Deployed Sites
Client: [Client](https://greenemax.github.io/team_picker_client/)
API: [API](https://fast-dusk-89844.herokuapp.com/)


## List of technologies used
HTML, CSS, MongoDB, Mongoose, Express, React, Node, Lodash, Axios, Bootstrap

## User Stories
As an unregistered user I want to be able to sign up for an account.
As a registered user I want to be able to sign in.
As a registered user I want to be able to change password.
As a registered user I want to be able to sign out.
As an authorized user I want to be able to create a lineup.
As an authorized user I want to be able to name my lineup.
As an Authorized user I want to be able to view my lineup.
As an Authorized user I want to be able to delete my lineup.

## List unsolved problems which would be fixed in future iterations.

### Enhanced Player Statistics
There’s great potential to track and add many of the available advanced statistics in today's NBA. The most notable statistic is Usage rate, which reflects how often a player is used while on the court. James Harden is an example of a player with a very high usage rate, because the ball is almost always in his posession and he does most of the scoring and offensive creation. Thus, having too many players with a high usage rate should have diminishing results, as the players will not share the ball well. Essentially, a team of ball hogs should not play as well as a balanced team. With the right statistical model I believe this is achievable.

### Connect to Basketball Reference Database
Additionally, it would be great to expand the player component to include more statistics. If I could connect with an API that collects basketball player data it would be feasible to build a roster with any player in NBA history as opposed to a preselected set of players (which is very much one persons opinion, there's a bunch of great players I omitted choosing just 25).

### Search by category
I'd like to have implemented a search feature, where a user could select a player category and only have players of that category appear.

## Document your planning, process and problem-solving strategy
This project in its current form reflects a simple crud on the front end, with an api database that has the capacity to access a third resource, players when properly structured. This documentation refers conceptually to the vision expressed in the other aspects of the readMe while only functionally displaying the crud mentioned earlier. Much of the planning for this project centered around creating lineups as a nested sub doc of the user, with the lineups containing referenced player resources. This would allow the user to cusomized the players on a lineup. Where I ran into issues was communicating with the database on the front end. After working through the routes on the api and in postman I spent so much time on the

## API Routes

### players (not accessible in V1)
| Method      | Path | Function |
| ----------- | ----------- | ----------- |
| Get      | /players      | Get all available players (index) |
| Get   | /players/:id     | Get one player by ID (show) |
| Post   |  /players | Post one player |
| Patch  | /players/:id  | Update a player |
| Delete   |  /players/:id | Delete a player |

### User

| Method      | Path | Function |
| ----------- | ----------- | ----------- |
| Post      | /sign-up      | Sign up a new user |
| Post   | /sign-in     | Sign in an existing user |
| Patch   |  /change-password | Change password of existing user |
| Delete   |  /sign-out | Sign out existing user |

### lineup

| Method      | Path | Function |
| ----------- | ----------- | ----------- |
| Get      | /lineups      | Get lineups associated with current user (index) |
| Get   | /lineup/:id     | Get one lineup by ID associated with current user (show) |
| Patch   |  /lineup | Add a lineup to the current user |
| Patch  | /lineup/:id  | Add a player to one lineup associated with current user |
| Delete  | /lineup/:id | Delete a lineup associated with current user |
| Post   |  /lineup-create | Create a lineup associated with current user|
