
# FlutterOllamaChat

## Overview

FlutterOllamaChat is a **proof of concept (POC)** project designed to explore AI-powered chatbot interactions using **Ollama** as the AI backend. The system consists of a **TypeScript-based REST API** with **MongoDB**, and a **Flutter front-end** for user interactions.

This project aims to develop an **AI model** that can be **hosted locally**, reducing reliance on cloud-based services like ChatGPT or Gemini, thereby eliminating API costs. A key focus is on **function tooling**, allowing the AI to retrieve real-time data—such as the availability of doctors in a fictional hospital—and provide informed recommendations to users.

> **⚠️ Note:** This project is based on older templates and existing codebases, so some unused code may be present. It is intended for experimental purposes only.

----------

## Features ✨

-   **AI-powered medical assistant**: A chatbot that helps users find doctors based on availability.
-   **Function tooling integration**: AI can fetch real-time doctor availability using a MongoDB database.
-   **Context-aware chat**: Conversations are stored, and previous messages are considered for better responses.
-   **Local AI model**: Uses Ollama instead of cloud-based LLMs to reduce costs.
-   **REST API**: Built with TypeScript, Express, and MongoDB.
-   **Flutter front-end**: For user-friendly interactions.

----------

## Technology Stack 🛠️

### **Backend:**

-   Node.js
-   Express.js
-   TypeScript
-   MongoDB
-   Ollama (local AI model)

### **Frontend:**

-   Flutter

----------

## API Details 🌐

### **Endpoint:**


`POST http://localhost:3031/api/chat/textChat` 

### **Example Request Body:**


`{
    "device_id": "test-mobile",
    "message": "Yes please!", 
    "from_chat": "mobile",
    "chat_id": "67a8c97ec7a9b707be0bcb59"
}` 

-   **If `chat_id` is provided** → The entire conversation history is sent to the AI for context.
-   **If `chat_id` is missing** → A new conversation is started. It will return chat_id.

### **AI Behavior:**

-   The AI model **MediHelper** acts as a virtual assistant at _Medicare Hospital_.
-   It **retrieves doctor availability** via function tooling and provides recommendations.
-   It **does not prescribe medication** but can suggest home remedies for minor issues.
-   It may **ask for user details** (name, phone number) for follow-up with a doctor.

----------

## Setting Up Locally 🖥️

### **1. Clone the Repository**


`git clone <repository-url>
cd FlutterOllamaChat` 

### **2. Install Dependencies**


`yarn install` 

### **3. Configure Environment Variables**

Copy the `.env.example` file and rename it to `.env`, then update values like database info.


`cp .env.example .env` 

### **4. Start MongoDB**

Make sure MongoDB is running locally or provide a connection string in `.env`.

### **5. Run the Backend**


### Development server
`yarn run dev`



----------

## Acknowledgments 🙌

This project is built upon an **Express, MongoDB, TypeScript REST API starter** from [morshedmasud](https://github.com/morshedmasud). Kudos to the original author! 👏

----------

## ⚠️ Disclaimer

This project is a **POC (Proof of Concept)** and should not be used for real medical consultations. The AI does **not replace professional medical advice**. Always consult a licensed healthcare professional for medical concerns.