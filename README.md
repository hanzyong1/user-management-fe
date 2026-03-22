# User Management Next.js App

## Overview

This is a Next.js application of a User Management system  
It allows users to log in, view, and update their profile, including uploading a profile picture

## Tech Stack

- Next.js (App Router)
- Mantine Ui for styling

## Features

### Authentication

- User login with email and password
- JWT-based authentication
- Refresh token support
- User registration

### Profile Management

- Get user profile details
- Update profile details
- Upload profile picture to Azure Blob Storage

## Setup Instructions

1. Install dependencies

```
npm install
```

2. Create a `.env` file based on `.env.example` and update it with your local backend URL

3. Start the development server

```
npm run dev
```

4. Access the app at `http://localhost:3000`

## Assumptions

- It is assumed that users will input valid and correctly formatted data (e.g. valid email format)
- Backend API is running and accessible at the URL defined in `.env` file
