# Feedback Testing - Design System Components

A React-based design system component library built with TypeScript and Vite, implementing components from Figma design tokens.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd feedback-testing
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Build

Build the project for production:
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Type Checking

Run TypeScript type checking:
```bash
npm run type-check
```

## 📁 Project Structure

```
├── src/                 # Source code
│   ├── assets/         # Static assets (images, etc.)
│   │   └── images/      # Image assets
│   ├── components/      # React components
│   ├── data/           # Mock data and configurations
│   ├── pages/          # Page components
│   └── main.tsx        # Application entry point
├── tokens/             # Design tokens (colors, typography, spacing, etc.)
├── docs/               # Documentation
│   ├── commands/       # Development commands and workflows
│   └── design-tokens-summary.md
└── dist/               # Build output (generated, not committed)
```

## 🎨 Design Tokens

Design tokens are located in the `tokens/` directory and include:
- **Colors**: Color palette and semantic color tokens
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale
- **Rounding**: Border radius values

CSS variables are automatically generated from the tokens and can be imported:
```typescript
import '../tokens/css-variables.css';
```

## 🧩 Components

The project includes the following components:
- **BarGraph**: Data visualization component
- **Button**: Interactive button component
- **Cell**: Layout cell component with multiple sizes
- **Chip**: Tag/chip component
- **Drawer**: Drawer component with header and footer
- **Dropdown**: Dropdown menu component
- **FeedbackCard**: Card component for displaying feedback
- **NavigationBar**: Navigation bar component
- **PageAction**: Action button component
- **SearchInput**: Search input field component
- **SkillsModal**: Modal for skills selection
- **VerticalMarker**: Vertical progress marker component

Each component is located in `src/components/[ComponentName]/` and includes:
- Component TypeScript file
- CSS styles
- Specification/documentation (if available)
- Index file for exports

## 🛠️ Technology Stack

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **CSS**: Component styling with CSS variables

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## 🌐 GitHub Pages Deployment

The project is configured for GitHub Pages deployment with the base path `/feedback-testing/`. 

To deploy:
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to GitHub Pages

## 📚 Documentation

Additional documentation can be found in the `docs/` directory:
- Component specifications and design analysis
- Development workflows and commands
- Design tokens summary

## 📄 License

[Add your license information here]
