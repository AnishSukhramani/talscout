# TalentScout - AI-Powered Recruitment Platform

TalentScout is a modern React-based recruitment platform that uses AI to match candidates with job requirements. This application provides a comprehensive dashboard for managing job searches, viewing candidates, and analyzing recruitment data.

## Features

- **AI-Powered Candidate Matching**: Advanced matching algorithm to find the best candidates
- **Multi-Platform Integration**: Simulates sourcing from LinkedIn, Naukri.com, and other job portals
- **Interactive Dashboard**: Real-time analytics and insights
- **Advanced Filtering**: Filter candidates by skills, experience, location, and match score
- **Export Functionality**: Export candidate data to CSV format
- **Responsive Design**: Modern neumorphism UI that works on all devices

## Technology Stack

- **Frontend**: React 18, React Router DOM
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with custom neumorphism design
- **Icons**: Lucide React
- **Data Management**: LocalStorage (for demo purposes)
- **Build Tool**: Create React App

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/talscout.git
   cd talscout
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
talscout/
├── public/                 # Static files
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   │   └── ui/           # Base UI components (buttons, cards, etc.)
│   ├── entities/         # Data models and mock API
│   ├── lib/              # Utility functions
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
├── Pages/                # Page components
│   ├── Dashboard.jsx     # Main dashboard
│   ├── JobSearch.jsx     # Job search form
│   ├── Candidates.jsx    # Candidates list
│   └── CandidateResults.jsx # Search results
├── Components/           # Feature-specific components
│   ├── dashboard/        # Dashboard components
│   ├── search/          # Search-related components
│   └── results/         # Results-related components
└── Layout.js            # Main layout component
```

## Key Features Explained

### Dashboard
- Overview statistics and metrics
- Recent job searches
- Top candidates with high match scores
- Activity feed showing recent actions

### Job Search
- Comprehensive job requirements form
- Skill and soft skill selection
- Experience and education filters
- AI-powered candidate discovery simulation

### Candidate Management
- Browse all candidates in the system
- Advanced search and filtering
- Detailed candidate profiles
- Match score visualization

### Results Analysis
- Detailed candidate results with rankings
- Multiple filtering options
- Sort by match score, experience, or name
- Export functionality for data analysis

## Data Storage

This demo application uses localStorage for data persistence. In a production environment, this would be replaced with:
- Backend API integration
- Database storage (PostgreSQL, MongoDB, etc.)
- Authentication and user management
- Real job portal integrations

## Customization

### Styling
The application uses a custom neumorphism design system. You can modify the CSS variables in `Layout.js` to change the color scheme:

```css
:root {
  --neu-bg: #ffffff;
  --neu-light: #f8f9fa;
  --neu-dark: #d6d8db;
  --neu-text: #000000;
  --neu-accent: #4299e1;
}
```

### Adding New Features
1. Create new components in the appropriate directory
2. Add routing in `src/App.js`
3. Update the navigation in `Layout.js`
4. Extend the entity models as needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This is a demo application that simulates AI-powered recruitment functionality. In a production environment:
- Implement proper API integrations with job portals
- Add authentication and authorization
- Use a real database for data persistence
- Implement proper error handling and validation
- Add comprehensive testing
- Follow data privacy regulations (GDPR, etc.)

## Support

For questions or support, please open an issue in the GitHub repository.
