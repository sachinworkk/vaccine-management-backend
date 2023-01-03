import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Vaccine Management REST API Documentation",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    servers: [{ url: process.env.BASE_URL }],
  },
  apis: [
    `${__dirname}/routes/*.ts`,
    `${__dirname}/docs/docSchemas/*.ts`,
    "./dist/routes/*.js",
    "./dist/docs/docSchemas/*.js",
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
