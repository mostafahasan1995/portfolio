# Troubleshooting Slow Next.js Startup on Windows

If you're experiencing slow startup times with `npm run dev`, try these solutions:

## Quick Fixes

### 1. Clear Cache and Restart
```bash
# Stop any running Node processes
# Then run:
Remove-Item -Recurse -Force .next
npm run dev
```

### 2. Check Port Availability
Make sure port 3000 is not in use:
```bash
netstat -ano | findstr :3000
```

### 3. Use a Different Port
```bash
npm run dev -- -p 3001
```

### 4. Disable Antivirus Scanning (Temporarily)
Windows Defender or other antivirus software can slow down file watching. Add the project folder to exclusions.

### 5. Check Node Version
Make sure you're using Node.js 18+:
```bash
node --version
```

## Performance Optimizations Already Applied

- Webpack polling configured for Windows file system
- File watching optimized to ignore node_modules and .next
- SWC minification enabled

## If Still Slow

1. **Close other applications** that might be using resources
2. **Restart your computer** to clear any stuck processes
3. **Check disk space** - low disk space can slow down file operations
4. **Update Node.js** to the latest LTS version

## Alternative: Use Production Build for Testing

If development is too slow, you can test with production build:
```bash
npm run build
npm start
```

