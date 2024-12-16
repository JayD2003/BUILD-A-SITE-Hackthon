# BUILD-A-SITE-Hackthon

# TimePensieve: Letters to Your Future Self

**TimePensieve** is a creative platform that allows users to write letters to their future selves, preserving memories and emotions for a specific future date. With the ability to schedule email delivery and optionally add photos or videos, **TimePensieve** brings the concept of a digital time capsule to life.

---

## Problem Statement

**Time Capsule: Letters to Future Self**

Create a platform where users can:
1. Write heartfelt letters to their future selves.
2. Set a specific date for the email delivery of their letters.
3. Optionally, add photos or videos to make their messages even more meaningful.

---

## Features

- **Future Messaging**: Craft personal messages and schedule them for future delivery.
- **Email Integration**: Seamless email delivery via EmailJS.
- **Media Attachments**: Option to include photos and videos (enhancement in progress).
- **Secure Authentication**: Firebase Authentication for user account management.
- **Real-Time Database**: Firebase Firestore to store and manage user data.
- **Intuitive UI**: A sleek, user-friendly interface built with React.js.

---

## Technologies Used

- **React.js**: For building a responsive and dynamic frontend.
- **Firebase Firestore**: For secure, real-time database storage.
- **Firebase Authentication**: For user sign-up and login functionality.
- **EmailJS**: For sending scheduled emails directly from the application.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone [text](https://github.com/JayD2003/BUILD-A-SITE-Hackthon)
   cd TimePensieve

2. Install dependencies:
    ```bash
    npm install

3. Configure environment variables:
    Firebase credentials (Firestore, Authentication).
    EmailJS keys: userID, serviceID, and templateID.
    Start the development server:
    ```bash
    npm run dev