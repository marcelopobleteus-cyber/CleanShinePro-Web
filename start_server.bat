@echo off
echo Starting CleanShine Pro Web Server...
cd "03 Web"
echo Running on http://localhost:3000
npm run dev -- --port 3000
pause
