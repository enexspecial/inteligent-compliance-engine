# Mobile App Screens Implementation

This document describes the implementation and features of the main screens in the mobile app.

---

## Dashboard Screen

- **Welcome message**: Greets the user by name.
- **Overview card**: Shows the total number of documents.
- **Recent Documents**: Lists the 3 most recently uploaded documents.
- **Quick Actions**: Buttons to upload a document or start an analysis.
- **Notification Icon**: Bell icon in the top right triggers a demo local notification.
- **Loading/Error States**: Displays loading indicators and error messages as needed.

---

## Documents Screen

- **Document List**: Fetches and displays all user documents from the backend.
- **Upload Document**: Allows users to pick and upload a document using the system file picker (`expo-document-picker`).
- **UI**: Shows document name and upload date.
- **Loading/Error States**: Handles loading and error states gracefully.

---

## Analysis Screen

- **Document Selection**: Lists all user documents for selection.
- **Request Analysis**: Allows the user to request a compliance analysis for a selected document.
- **Analysis Result**: Shows the status and result of the most recent analysis request, with polling for completion.
- **Loading/Error States**: Displays loading indicators and error messages as needed.
- **Note**: Listing all past analysis jobs is not supported due to backend API limitations.

---

## Profile Screen

- **Profile Data**: Fetches and displays the user's profile information (name, first name, last name, email, role, join date).
- **Edit Profile**: Allows editing of name, first name, and last name.
- **Save Changes**: Updates the profile via the backend API and reflects changes in the UI.
- **Loading/Error States**: Handles loading and error states.

---

## Notifications

- **Local Notifications**: Uses `expo-notifications` to send and display local notifications.
- **Permissions**: Requests notification permissions on app startup.
- **Notification Utility**: `sendLocalNotification(title, body, data?)` utility is available for sending notifications from anywhere in the app.
- **Demo**: The notification bell icon on the Dashboard triggers a test notification.

---

## General Notes

- **Navigation**: Uses React Navigation (Drawer + Stack) for screen management and protected routes.
- **State Management**: Uses React Context for authentication and theming.
- **API Integration**: All data is fetched from or sent to the backend using utility functions and services.
- **UI/UX**: All screens include modern, user-friendly UI with proper error and loading handling.

---

For further enhancements, consider adding:
- Notification history screen
- Analysis job history (when backend supports it)
- Document preview/download features
- Profile avatar upload and password change 