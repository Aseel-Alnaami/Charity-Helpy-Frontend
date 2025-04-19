
# Charity Helpy - Frontend

**Charity Helpy** is a full-stack charity web platform developed as part of an internship at [Tahaluf UAE].  
This Angular-based frontend connects with a RESTful ASP.NET Core backend and Oracle database, allowing users to explore, publish, and donate to charity organizations securely.


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


# 🔗 Backend Repository

This frontend is powered by a RESTful API built with ASP.NET Core.  
You can find the backend code here:  
👉 [Charity Helpy - Backend Repository](https://github.com/Aseel-Alnaami/Charity-Heply-BackEnd)

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
