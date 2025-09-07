# 🚀 AI Engineer Portfolio

A modern, responsive portfolio website built with React and Material-UI, showcasing expertise in AI engineering, prompt engineering, and machine learning. This portfolio features a sleek dark theme with glassmorphism effects and smooth animations.

## ✨ Features

- **Modern Design**: Dark theme with glassmorphism effects and gradient accents
- **Responsive**: Fully responsive design that works on all devices
- **Animated**: Smooth animations and transitions using Framer Motion
- **Material-UI**: Modern component library with custom theming
- **AI-Focused**: Specialized sections for AI/ML projects and skills
- **Performance Optimized**: Fast loading with optimized assets and code splitting

## 🛠️ Tech Stack

- **Frontend**: React 19, Material-UI v5, Framer Motion
- **Styling**: Custom Material-UI theme, CSS-in-JS
- **Routing**: React Router DOM
- **Icons**: Material-UI Icons
- **Fonts**: Roboto (Google Fonts)
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/green-portfolio.git
   cd green-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the portfolio

## 🏗️ Project Structure

```
green-portfolio/
├── public/
│   ├── images/
│   │   └── projects/          # Project screenshots
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/            # Header, Footer components
│   │   ├── sections/          # Page sections (Hero, About, etc.)
│   │   └── ui/               # Reusable UI components
│   ├── data/                 # Static data files
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Page components
│   ├── theme/                # Material-UI theme configuration
│   ├── utils/                # Utility functions
│   ├── App.js               # Main App component
│   └── index.js             # Entry point
└── package.json
```

## 🎨 Customization

### Theme Configuration

The theme is defined in `src/theme/theme.js`. You can customize:

- **Colors**: Primary (#00e676), Secondary (#1976d2), and background colors
- **Typography**: Font families, sizes, and weights
- **Shadows**: Custom shadow system with AI-themed colors
- **Component Styles**: Overrides for Material-UI components

### Content Updates

1. **Personal Information**: Update `src/components/sections/HeroSection.js` and `src/components/layout/Footer.js`
2. **Skills**: Modify `src/data/skills.js`
3. **Projects**: Update `src/data/projects.js`
4. **About Section**: Edit `src/components/sections/AboutSection.js`

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and add it to the Home page in `src/pages/Home.js`
3. Update navigation in `src/components/layout/Header.js`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder.

### Deployment Options

1. **Vercel** (Recommended)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`

3. **GitHub Pages**
   ```bash
   npm install --save-dev gh-pages
   # Add to package.json scripts: "deploy": "gh-pages -d build"
   npm run deploy
   ```

## 🎯 Key Components

### Hero Section
- Animated introduction with floating elements
- Skills showcase with animated chips
- Call-to-action buttons
- Responsive avatar with glassmorphism effects

### About Section
- Personal story and professional background
- Statistics cards with hover effects
- Certifications display
- Core values presentation

### Skills Section (To be added)
- Interactive skill cards with progress bars
- Category-based filtering
- Animated skill level indicators

### Projects Section (To be added)
- Project showcase with detailed cards
- Technology stack display
- Live demo and GitHub links
- Category filtering

## 🎨 Design Principles

- **Minimalist**: Clean, uncluttered design focusing on content
- **Modern**: Contemporary design trends with glassmorphism and gradients
- **Accessible**: WCAG compliant with proper contrast ratios and keyboard navigation
- **Fast**: Optimized for performance with lazy loading and code splitting

## 🔧 Development

### Available Scripts

- `npm start`: Run development server
- `npm test`: Run test suite
- `npm run build`: Build for production
- `npm run eject`: Eject from Create React App (not recommended)

### Code Style

- **ESLint**: Code linting with React rules
- **Prettier**: Code formatting (recommended to set up)
- **Component Structure**: Functional components with hooks
- **File Organization**: Feature-based folder structure

## 📈 Performance Features

- **Lazy Loading**: Components and images load on demand
- **Code Splitting**: Automatic code splitting with React.lazy()
- **Optimized Images**: WebP format with fallbacks
- **Caching**: Service worker for offline functionality
- **Bundle Analysis**: Webpack bundle analyzer for optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI**: For the excellent component library
- **Framer Motion**: For smooth animations
- **React**: For the amazing framework
- **Community**: For inspiration and feedback

## 📞 Contact

- **Email**: your.email@example.com
- **LinkedIn**: [linkedin.com/in/yourusername](https://linkedin.com/in/yourusername)
- **GitHub**: [github.com/yourusername](https://github.com/yourusername)
- **Website**: [yourportfolio.dev](https://yourportfolio.dev)

---

**Built with ❤️ and cutting-edge AI technology**