# Noēma Project Structure

This document outlines the complete structure of the Noēma project.

```
noema-project/
│
├── frontend/                          # React frontend application
│   ├── public/                        # Static assets
│   ├── src/
│   │   ├── components/                # React components
│   │   │   ├── Header.jsx            # App header with branding
│   │   │   ├── InputPanel.jsx        # Note input interface
│   │   │   ├── NotesList.jsx         # List view of notes
│   │   │   ├── MindMap.jsx           # React Flow mind map
│   │   │   ├── InsightsPanel.jsx     # AI insights display
│   │   │   └── ViewToggle.jsx        # Switch between views
│   │   ├── App.jsx                    # Main application component
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global styles + Tailwind
│   ├── index.html                     # HTML template
│   ├── package.json                   # Frontend dependencies
│   ├── vite.config.js                 # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── postcss.config.js             # PostCSS configuration
│
├── backend/                           # Node.js backend API
│   ├── server.js                      # Express server + OpenAI integration
│   ├── package.json                   # Backend dependencies
│   ├── .env.example                   # Environment variables template
│   └── .env                          # Environment variables (git-ignored)
│
├── README.md                          # Project overview and quick start
├── SETUP_GUIDE.md                    # Detailed setup instructions
├── SAMPLE_NOTES.md                   # Example notes for testing
├── package.json                       # Root package.json with scripts
├── quickstart.sh                      # Quick setup script
├── .gitignore                        # Git ignore rules
└── vercel.json                       # Vercel deployment config
```

## Frontend Architecture

### Component Hierarchy

```
App
├── Header
├── InputPanel
├── ViewToggle
├── Content Area
│   ├── Notes View
│   │   ├── InsightsPanel
│   │   └── NotesList
│   └── Map View
│       └── MindMap (React Flow)
```

### Key Features by Component

**Header**
- Branding with logo
- Application title
- GitHub link

**InputPanel**
- Text area for note input
- Expandable on focus
- Note counter
- Add note button
- Generate insights button (appears after 3+ notes)
- Loading states

**NotesList**
- Displays all notes as cards
- Theme tags (after analysis)
- Delete functionality
- Empty state
- Hover effects

**MindMap**
- React Flow canvas
- Custom node types (theme/note)
- Circular layout algorithm
- Animated connections
- Mini-map navigation
- Zoom controls
- Background grid
- Empty state

**InsightsPanel**
- AI-generated insights
- Connected themes display
- Card-based layout
- Animations

**ViewToggle**
- Switch between Notes and Mind Map views
- Active state styling

### State Management

All state is managed in `App.jsx`:
- `notes`: Array of note objects
- `themes`: Clustered themes from AI
- `insights`: Generated insights
- `isLoading`: API call status
- `currentView`: 'list' or 'map'
- `error`: Error messages

### Styling System

**Tailwind Configuration**
- Custom color palette: sage, stone
- Custom fonts: Inter, Playfair Display, JetBrains Mono
- Extended theme

**Custom CSS Classes**
- `.glass-panel`: Frosted glass effect
- `.btn-primary`: Primary action button
- `.btn-secondary`: Secondary action button
- `.input-field`: Form input styling
- `.card`: Content card

**Animations**
- `fadeIn`: Entry animation
- `pulse-gentle`: Loading indicator
- Staggered list animations

## Backend Architecture

### API Endpoints

**GET `/api/health`**
- Health check endpoint
- Returns server status

**POST `/api/analyze`**
- Main analysis endpoint
- Accepts: `{ notes: string[] }`
- Returns: `{ themes: Theme[], insights: Insight[] }`

### Data Models

**Note**
```javascript
{
  id: number,
  text: string,
  theme: string | null,
  createdAt: string
}
```

**Theme**
```javascript
{
  name: string,
  insight: string,
  notes: Array<{ text: string }>
}
```

**Insight**
```javascript
{
  title: string,
  description: string,
  connectedThemes: string[]
}
```

### AI Integration

**OpenAI Configuration**
- Model: GPT-4o
- Temperature: 0.8 (for creativity)
- Max Tokens: 2000
- Response Format: JSON

**Prompt Engineering**
- System message: Expert role definition
- User message: Structured analysis request
- JSON schema enforcement
- Focus on non-obvious connections

### Error Handling

- API key validation
- Rate limiting detection
- Invalid response structure handling
- Network error handling
- Client-friendly error messages

## Design System

### Color Palette

**Primary (Sage Green)**
- `sage-50` to `sage-900`: Forest green variations
- Used for: Primary actions, themes, accents

**Neutral (Stone)**
- `stone-50` to `stone-900`: Warm grays
- Used for: Text, backgrounds, borders

**Semantic Colors**
- Success: Green tones
- Error: Red tones (minimal use)
- Warning: Amber tones (minimal use)

### Typography

**Font Families**
- `Inter`: Body text (light weight: 300, regular: 400, medium: 500, semibold: 600)
- `Playfair Display`: Headings and display text
- `JetBrains Mono`: Code and monospace

**Hierarchy**
- Display: 2xl, font-display, semibold
- Heading: xl-lg, font-display, semibold
- Body: base, font-sans, light (300)
- Caption: sm, font-sans, light

### Spacing & Layout

- Container: max-w-4xl (notes) / max-w-7xl (header)
- Padding: 6 (24px standard)
- Gap: 3-6 for spacing
- Border radius: lg (8px), xl (12px)

### Shadows & Effects

- Cards: shadow-sm, hover:shadow-md
- Glass panels: backdrop-blur-sm, bg-white/80
- Transitions: 200ms duration
- No drop shadows on text

## Technology Choices

### Why React?
- Component reusability
- Rich ecosystem
- Virtual DOM performance
- Easy state management

### Why React Flow?
- Purpose-built for node graphs
- Customizable nodes
- Built-in interactions (pan, zoom)
- Layout algorithms support

### Why Tailwind CSS?
- Rapid development
- Consistent design system
- No CSS-in-JS overhead
- Purge unused styles

### Why Express?
- Lightweight and fast
- Middleware ecosystem
- Easy API creation
- Node.js integration

### Why OpenAI GPT-4?
- Superior reasoning ability
- JSON mode for structured output
- Context understanding
- Pattern recognition

### Why Vercel?
- Zero-config deployment
- Automatic HTTPS
- Edge network
- Environment variables
- GitHub integration

## Development Workflow

### Local Development
1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Open browser: `http://localhost:3000`

### Making Changes

**Frontend Changes**
- Edit components in `src/components/`
- Hot reload updates automatically
- Check browser console for errors

**Backend Changes**
- Edit `server.js`
- Server restarts with `--watch` flag
- Test with curl or Postman

**Styling Changes**
- Edit Tailwind classes in components
- Modify `tailwind.config.js` for theme
- Add custom CSS in `index.css`

### Testing

**Manual Testing**
1. Add diverse notes (5-10)
2. Generate insights
3. Check theme clustering
4. Verify mind map rendering
5. Test view switching
6. Try error cases

**API Testing**
```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"notes":["note 1", "note 2", "note 3"]}'
```

## Deployment

### Vercel (Frontend)
1. Connect GitHub repository
2. Set root directory: `frontend`
3. Framework preset: Vite
4. Auto-deploy on push

### Backend Options

**Option 1: Vercel Serverless**
- Convert to API routes
- Deploy alongside frontend

**Option 2: Railway**
- Separate backend deployment
- Auto HTTPS
- Simple environment variables

**Option 3: Render**
- Free tier available
- Dockerfile support
- Managed environment

## Environment Variables

### Development
```
OPENAI_API_KEY=sk-proj-xxx
PORT=5000
NODE_ENV=development
```

### Production
```
OPENAI_API_KEY=sk-proj-xxx
NODE_ENV=production
```

## Performance Considerations

### Frontend
- Code splitting with Vite
- Lazy load React Flow
- Memoize heavy computations
- Debounce API calls

### Backend
- Keep API responses under 2MB
- Set reasonable token limits
- Implement rate limiting
- Cache common requests

## Security

### Frontend
- No sensitive data in client
- Sanitize user inputs
- HTTPS only in production

### Backend
- API key in environment variables
- CORS configuration
- Input validation
- Rate limiting
- Error message sanitization

## Future Enhancements

Potential features:
- User authentication
- Save/load projects
- Export mind maps
- Collaborative editing
- Advanced filtering
- Custom AI prompts
- Multiple AI models
- Offline mode
- Mobile app

---

This structure provides a solid foundation for an AI-powered thought organization tool with room for growth and enhancement.
