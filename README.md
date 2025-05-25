# 📝 Purple Notes

A beautiful, modern desktop note-taking application built with Electron, React, and TypeScript.

![Purple Notes](https://img.shields.io/badge/Electron-App-47848F?style=for-the-badge&logo=electron)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.5.5-3178C6?style=for-the-badge&logo=typescript)

## ✨ Features

- **Modern UI**: Beautiful gradient background with clean, intuitive design
- **Create Notes**: Add notes with title and description
- **Persistent Storage**: Notes are automatically saved to local storage
- **Delete Notes**: Remove notes with confirmation dialog
- **Date Tracking**: Automatic creation date for each note
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Responsive Design**: Clean interface that adapts to window resizing

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd my-app
```

1. Install dependencies:

```bash
pnpm install
```

1. Start the development server:

```bash
pnpm start
```

## 🛠️ Development Scripts

| Script | Description |
|--------|-------------|
| `pnpm start` | Start the app in development mode |
| `pnpm package` | Package the app for distribution |
| `pnpm make` | Create distributable packages |
| `pnpm publish` | Publish the app |
| `pnpm lint` | Run ESLint to check code quality |

## 🏗️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Desktop Framework**: Electron 36.3.1
- **Language**: TypeScript 4.5.5
- **Build Tool**: Vite 5.4.19
- **Bundler**: Electron Forge 7.8.1
- **Package Manager**: pnpm

## 📁 Project Structure

```text
my-app/
├── src/
│   ├── App.tsx          # Main React component with note logic
│   ├── index.css        # Styling with purple gradient theme
│   ├── main.ts          # Electron main process
│   ├── preload.ts       # Electron preload script
│   ├── renderer.ts      # Electron renderer entry
│   └── renderer.tsx     # React app entry point
├── forge.config.ts      # Electron Forge configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.*.config.ts     # Vite build configurations
```

## 💡 How It Works

### Note Management

- **Create**: Fill out the form with title and description, click "Add Note"
- **View**: All notes are displayed in chronological order (newest first)
- **Delete**: Click the delete button and confirm to remove a note
- **Persistence**: Notes are automatically saved to localStorage

### Data Structure

```typescript
interface Note {
    id: string;           // Unique identifier
    title: string;        // Note title
    description: string;  // Note content
    createdAt: Date;     // Creation timestamp
}
```

## 🎨 Styling

The app features a modern design with:

- Purple gradient background (`#667eea` to `#764ba2`)
- Clean white cards for notes and forms
- Smooth shadows and rounded corners
- Responsive typography
- Intuitive button styling

## 📦 Building for Production

### Package the App

```bash
pnpm package
```

### Create Distributables

```bash
pnpm make
```

This will create platform-specific distributables:

- **Windows**: `.exe` installer via Squirrel
- **macOS**: `.zip` archive
- **Linux**: `.deb` and `.rpm` packages

## 🔧 Configuration

### Electron Window Settings

- Default size: 1000x700px
- Minimum size: 800x600px
- Resizable with responsive design
- Standard title bar

### Build Configuration

- **Main Process**: `src/main.ts`
- **Renderer Process**: `src/renderer.tsx`
- **Preload Script**: `src/preload.ts`
- **Output**: `.vite/build/`

## 👨‍💻 Author

KevinComba  
Email: <kelchospense88@gmail.com>

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 🐛 Issues

If you encounter any issues or have suggestions, please create an issue on the repository.

---

Built with ❤️ using Electron and React