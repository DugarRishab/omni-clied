# Project Roadmap

Currently this app serves nodejs based APIs. Reactjs apps are in progress. Several bug fixes needs to be done in the existing framework and new features are to be added.

> **Integretion with Prism UI**  
> [PrismUI](https://github.com/DugarRishab/prism-ui) is a UI library currently under development. Developers are urged to use this library for all front-end (reactjs/react-native/flutter) templates.

## New features

### #1 Flutter app

This template must be able to run without configuring anything. Check out the `project_framework.md` more details on the project structure.

Components it must have:

- bottom navbar
- side menubar
- dialog component (for general purpose)
- alert popups
- buttons
- tags

Screens it must have:

- Login/Signup page
- Home Page (can be completely empty)
  
Additional Features it must have:

- state management using redux or something similar
- Error handlers

### #2 React-Native App

Same as [this section](/#1-add-flutter-templates). No additional features as of yet.

### #3 Flask API

This template must be able to run with as little configuration as possible. Check out the `project_framework.md` more details on the project structure.

- Must have a proper [**MCV architecture**](<https://www.geeksforgeeks.org/mvc-framework-introduction/#:~:text=The%20Model%2DView%2DController%20(,development%20aspects%20of%20an%20application>)
- Authorization/ Authentication Middlewares and Routes using
  - jwt token by using cookies
  - Google OAuth by using jwt cookies
  - Github OAuth (optional)
- Central Error Handlers
- Implement a USER MCs
- Implement Server-side rendering
- All routing must be done using [CRUD operations](https://www.freecodecamp.org/news/crud-operations-explained/) following [REST](https://restfulapi.net/) priciples

## BUG fixes and Improvements

All bugs and additional features for improvements can be found in the issues.