# SOS Beacon Pro

Emergency SOS alert application that sends your location to emergency contacts via SMS and WhatsApp.

## Features

- **One-tap SOS Button** - Instant emergency alerts with visual and audio feedback
- **Location Services** - Automatic GPS location acquisition with Google Maps integration
- **Contact Management** - Store up to 3 emergency contacts
- **Multiple Alert Channels** - Send alerts via SMS and WhatsApp
- **Session Tracking** - Active emergency session monitoring with location updates
- **Responsive Design** - Mobile-first design with desktop support
- **Dark Mode** - Theme switching capability
- **Audio Alerts** - Emergency sound notifications

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn/ui + Radix UI components
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## Getting Started

### Prerequisites

- Node.js & npm installed

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd sos-beacon-pro-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Usage

1. **Add Emergency Contacts**: Navigate to the Contacts page and add up to 3 emergency contacts
2. **Enable Location**: Allow browser location access when prompted
3. **Send SOS**: Press the SOS button on the home page to send emergency alerts
4. **Choose Alert Method**: Select SMS or WhatsApp to send your location to contacts

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── pages/              # Page components
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
├── lib/                # Library configurations
└── ...
```

## License

This project is private and proprietary.

## Support

For support and issues, please contact the development team.
