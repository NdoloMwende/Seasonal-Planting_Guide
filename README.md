# Seasonal Planting Guide

A **Single Page Application (SPA)** built with **Vite + React** to help users manage seasonal crop planting, track harvest timelines, and maintain a history of harvested crops.  
The project uses a **JSON Server** (hosted on Render) as a mock backend and includes crop-related images sourced from **Wikimedia Commons**.


## Project Overview

The **Seasonal Planting Guide** enables users to:
- Browse and filter crops by climate zones.
- Add crops to a personal garden with planting dates.
- Track expected harvest dates based on crop maturity.
- Update the planting date from My Garden
- Receive alerts when crops are ready to harvest.
- View a historical record of harvested crops.
### Project Features
- Built with Vite + React for fast performance
- Modular component structure
- Custom hooks for filtering and deletion with undo
- Toast notifications for user feedback
### Technologies used
- React (Vite)
- JSON Server (mock backend)
- React Router
- React Toastify
- Render (hosting)


## Live Demo

- **Website:** [Deployed Site]( http://localhost:5173/)  
- **Mock API (JSON Server on Render):** [Deployed API](https://seasonal-planting-guide-json-api.onrender.com/)

## Project Structure
```bash
Seasonal-Planting-Guide/
├── public/                  
├── src/                     
│   ├── components/          
│   │   ├── AddPlantForm.jsx
│   │   ├── CropCard.jsx
│   │   ├── FilterBar.jsx
│   │   ├── HistoryCards.jsx
│   │   ├── MyGardenCards.jsx
│   │   └── Navbar.jsx
│   ├── hooks/               
│   │   ├── useFilter.js
│   │   └── useDeleteWithUndo.jsx
│   ├── pages/               
│   │   ├── History.jsx
│   │   ├── Home.jsx
│   │   └── MyGarden.jsx
│   ├── utils/               
│   │   └── harvestUtils.js
│   ├── App.jsx              
│   ├── App.css              
│   ├── index.css            
│   ├── index.html          
│   └── main.jsx             
├── .gitignore               
├── package.json             
├── README.md                
└── ... (other config files, e.g., .env, .eslintrc)
```

## Configuration Instructions
- Clone the repository:
  ```bash
  git clone https://github.com/your-username/seasonal-planting-guide.git
  cd seasonal-planting-guide 
  ```
 - Ensure you have Node.js version greater than 18 installed
 - Backend JSON API is already hosted on Render
 - If you wish to run locally, configure the json-server and update API URLs in the project

## Installation Instructions
### Install dependencies
```bash
npm install
```
### Run the development server
```bash
npm run dev
```
## Operation Instructions
- Run the frontend with npm run dev
- Ensure JSON server is running(via render)
- Open the provided localhost URL to access the app(http://localhost:5173/)
- Browse crops, search and add to your garden
## Copyright
- All images are sourced from Wikipedia Commons.
## Contact Information
- @NdoloMwende - Mercy Ndolo(Scrum master)
- @alvinmuira - Alvin Muira
- @Ian-N-N - Ian Njuguna
- @Oscar254-tech - Oscar Ochanda
## Credits and Acknowledgements
- Contributors: @NdoloMwende, @alvinmuira, @Ian-N-N, @Oscar254-tech
- Image Source: Wikipedia Commons
- Hosting: Render



