const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "CSE 341 Contacts API - Sophie Silveira",
    description: "Contacts API for CSE 341 (Personal Project)",
    contact: {
      name: "Sophie Silveira",
      email: "sil24040@byui.edu"
    }
    // license is OPTIONAL — you can remove it completely
  },
  servers: [
    {
      url: "https://cse341-sophiesilveira1-12.onrender.com",
      description: "Production (Render)"
    },
    {
      url: "http://localhost:8080",
      description: "Local dev"
    }
  ]
};

const outputFile = "./swagger.json";

// IMPORTANT: your routes folder is /routes (NOT /src/routes)
const routes = ["./server.js"]; // or "./app.js" if server.js just calls app.js

swaggerAutogen(outputFile, routes, doc);
