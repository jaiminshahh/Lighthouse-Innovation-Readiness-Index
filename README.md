# Welcome to your Lighthouse Innovation Readiness Index project

## Project info

This project contains the Lighthouse Innovation Readiness Index assessment tool to evaluate your organization's digital maturity.

## How can I edit this code?

### Prerequisites: Setting up Node.js (Windows)

1. **Download and install fnm (Fast Node Manager)**
   ```cmd
   winget install Schniz.fnm
   ```

2. **Download and install Node.js**
   ```cmd
   fnm install 23
   ```

3. **Verify the Node.js version**
   ```cmd
   node -v
   ```
   Should print "v23.11.0".

4. **Verify npm version**
   ```cmd
   npm -v
   ```
   Should print "10.9.2".

### Setup Node.js Environment with fnm

1. **Manually Activate Node in CMD via fnm env**
   Run this exact command in CMD:
   ```cmd
   @FOR /f "tokens=*" %i IN ('fnm env --shell=cmd') DO @%i
   ```

2. **Select Node Version**
   Then run:
   ```cmd
   fnm use 23
   ```

*Note: All the codes provided are for Windows.*

### Getting the Code

1. **Clone the Repo**
   Open a terminal and run:
   ```bash
   git clone https://github.com/jaiminshahh/digital-miq-tracker.git
   cd digital-miq-tracker
   ```

2. **Open in Your Code Editor**
   If you're using VS Code:
   ```bash
   code .
   ```

### Setting Up the Project

1. **Install Dependencies**
   In your terminal (inside the digital-miq-tracker folder), run:
   ```bash
   npm install
   ```

2. **Start the Local Dev Server**
   After install finishes:
   ```bash
   npm run dev
   ```
   This will:
   - Launch a local dev server (usually at http://localhost:8080)
   - Watch for changes so updates show instantly

3. **Open in Browser**
   After running npm run dev, you'll see something like:
   ```
   VITE v5.x.x ready in 500ms

   ➜  Local:   http://localhost:8080/
   ```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS