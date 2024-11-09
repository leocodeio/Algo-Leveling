# Create React App with TypeScript

npx create-react-app ./ --template typescript -y

# tailwind

```
pnpm install tailwindcss postcss autoprefixer
npx tailwindcss init
```

tailwind.config.js

```

/** @type {import('tailwindcss').Config} \*/
export default {
content: ["./index.html", "./src/**/\*.{js,ts,jsx,tsx}"],
theme: {
extend: {},
},
plugins: [],
}
```

# start the server

```
pnpm run start
```
