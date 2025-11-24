# Noēma

**Discover Connections in Your Thoughts**

Noēma is an AI-powered thought organization tool that helps you discover obscure relationships between ideas and generate new insights through intelligent synthesis. By combining natural language processing with beautiful visual design, Noēma enhances creative thinking, brainstorming, and research.

![Noema](https://via.placeholder.com/1200x600/5f6b5f/ffffff?text=Noema)

## ✨ Features

- **Intelligent Thought Capture**: Add notes and ideas through an elegant, minimalist interface
- **AI-Powered Theme Clustering**: Automatically groups related ideas using GPT-4
- **Insight Generation**: Discovers non-obvious connections you wouldn't have thought of
- **Interactive Mind Maps**: Visualizes relationships with React Flow
- **Modern UI/UX**: Beautiful, minimalist design with natural color palette
- **Real-time Analysis**: Instant feedback and dynamic visualizations

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **React Flow** - Interactive mind map visualization
- **Tailwind CSS** - Styling and design system
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **OpenAI GPT-4** - AI clustering and insight generation
- **CORS** - Cross-origin resource sharing

### Deployment
- **Frontend**: Vercel
- **Backend**: Vercel Serverless Functions or separate hosting
- **Version Control**: GitHub

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/noema.git
   cd noema
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   PORT=5000
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   Backend will run on `http://localhost:5000`

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

## 📖 Usage

1. **Add Notes**: Enter your thoughts, ideas, or observations in the input field
2. **Collect Ideas**: Add at least 3 notes (more is better for deeper analysis)
3. **Generate Insights**: Click "Generate Insights" to analyze your notes
4. **Explore Connections**: 
   - Switch between **Notes View** to see themed lists
   - Switch to **Mind Map View** to visualize relationships
5. **Discover Patterns**: Review AI-generated insights that reveal hidden connections

## 🎨 Design Philosophy

Noēma embraces a minimalist, modern aesthetic inspired by natural materials and thoughtful design:

- **Color Palette**: Forest green, stone gray, beige, black, and white
- **Typography**: Elegant font combinations (Inter, Playfair Display, JetBrains Mono)
- **Animations**: Subtle, purposeful transitions
- **Layout**: Clean, spacious, and focused on content
- **No Gradients**: Solid colors and subtle textures only

## 🌐 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Configure build settings:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Backend (Vercel Serverless)

1. Create `api` directory in project root
2. Move backend code to serverless functions
3. Add environment variables in Vercel dashboard
4. Deploy

Alternatively, deploy backend to Railway, Render, or Heroku.

## 🔐 Environment Variables

### Backend
- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- React Flow for visualization capabilities
- Tailwind CSS for the design system
- Lucide for beautiful icons

## 📧 Contact

Project Link: [https://github.com/yourusername/noema](https://github.com/yourusername/noema)

---

**Built with ❤️ for creative thinkers, researchers, and brainstormers**
