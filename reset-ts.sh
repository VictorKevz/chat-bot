#!/bin/bash

# Reset TypeScript and VS Code workspace
echo "🧹 Cleaning up TypeScript compilation cache..."

# Remove TypeScript build info
find . -name "tsconfig.tsbuildinfo" -delete
find . -name "*.tsbuildinfo" -delete

# Remove any remaining compiled files in src
find src -name "*.js" -delete 2>/dev/null || true
find src -name "*.d.ts" -delete 2>/dev/null || true

# Clear node_modules cache
echo "📦 Reinstalling dependencies..."
rm -rf node_modules package-lock.json
npm install

echo "✅ Cleanup complete!"
echo "Now restart VS Code for the TypeScript language server to reset properly."
