# Charity

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.
# Charity Helpy - Frontend

**Charity Helpy** is a full-stack charity web platform developed as part of an internship at [Tahaluf UAE].  
This Angular-based frontend connects with a RESTful ASP.NET Core backend and Oracle database, allowing users to explore, publish, and donate to charity organizations securely.

> 🔒 Note: This project is for learning/demo purposes only. It was developed based on company-provided requirements and is not intended for public or commercial use.

## 🌐 Live Demo
(You can add a link to a hosted version or demo video if available)

## 🧰 Tech Stack

- **Framework**: Angular 16
- **Languages**: TypeScript, HTML, CSS
- **UI Design**: Bootstrap
- **Map Integration**: Leaflet (OpenStreetMap)
- **Payment**: Stripe API (via backend)
- **API Connection**: ASP.NET Core RESTful API
- **Version Control**: Git

## ⚙️ Features

- View all verified charities on an interactive map
- Add new charities with location, mission, and category
- Secure online payments for publishing using Stripe
- Role-based access (Admin, User, Guest)
- Dynamic dashboard for admins with reports
- Automatic PDF invoices sent via email
- Clean, responsive UI with testimonial & contact forms

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- Angular CLI (`npm install -g @angular/cli`)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/charity-helpy-frontend.git

# Navigate to the project folder
cd charity-helpy-frontend

# Install dependencies
npm install

# Run the project locally
ng serve --open
