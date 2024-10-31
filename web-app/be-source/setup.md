# Initialize a new npm project

npm init -y

# Install TypeScript as a development dependency

pnpm install typescript --save-dev

# Install Node.js type definitions as a development dependency

pnpm install @types/node --save-dev

# Initialize a TypeScript configuration file

npx tsc --init

# Edit the tsconfig.json file

```
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}

```

# Compile TypeScript files

npx tsc

# Run the compiled JavaScript file

node dist/index.js

# Alternatively, run the TypeScript file directly (if not compiled)

node src/index.js
