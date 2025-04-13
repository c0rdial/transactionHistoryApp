# Transaction History Module

This is a React Native application built with Expo for managing and viewing transaction history. It includes features like biometric authentication, transaction details, and a toggle to show or hide transaction amounts.

---

## Features

- **Landing Page**: Welcome screen with navigation to login or sign-up.
- **Biometric Authentication**: Secure login using biometrics (fingerprint or face recognition).
- **Transaction History**: View a list of transactions with the ability to toggle visibility of amounts.
- **Transaction Details**: View detailed information about a specific transaction.
- **Error Handling**: error handling and fallback UI for unexpected issues.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **Expo CLI**: Install globally using `npm install -g expo-cli`
- **Git** (optional, for cloning the repository)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/c0rdial/transactionHistoryApp.git

2. Navigate to the project directory
   ```bash
   cd transactionHistoryApp

4. Install dependencies:
   ```bash
   npm install

## Running the App

1. Start the Expo Development server:
   ```bash
   expo start

3. Open the app on your device or emulator:

- iOS: Press i in the terminal to open the app in the iOS Simulator (requires macOS).
- Android: Press a in the terminal to open the app in an Android emulator or connected device.
- Web: Press w in the terminal to open the app in a web browser.

3. Alternatively, scan the QR code displayed in the terminal using the Expo Go app on your mobile device.

<details> <summary><strong>📁 Project Structure</strong> (click to expand)</summary>
TransactionHistoryApp/
├── assets/              # Static assets (e.g., images, icons)
├── components/          # Reusable components (e.g., TransactionItem, ErrorBoundary)
├── src/
│   ├── navigation/      # Navigation setup (e.g., AppNavigator)
│   ├── pages/           # Screens (e.g., LandingPage, UserAuthPage)
│   ├── service/         # Services (e.g., transactionService)
│   └── styles/          # Shared styles (if applicable)
├── App.tsx              # Main app entry point
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
</details>

## Environment Variables
This project does not currently use environment variables. If needed, you can add a .env file for storing sensitive information and use a library like react-native-dotenv to load them.

## Troubleshooting
- Expo CLI not found: Install it globally using npm install -g expo-cli.
- Metro bundler stuck: Clear the cache and restart:
    `expo start --clear`
- Biometric authentication not working: Ensure your device supports biometrics and has enrolled fingerprints or face data.
- App not opening on a device:
    - Ensure your device is connected to the same network as your computer.
    - Restart the Expo development server.
