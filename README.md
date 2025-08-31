# Prepify 🤖
<!-- Badges -->
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)



## Description
Prepify is an AI-powered mock interview platform designed to help users practice and improve their job interview skills. It leverages technologies like Next.js, React, TypeScript, and AI tools to provide a realistic interview experience with instant feedback.



## Table of Contents
- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Important Links](#important-links)
- [Footer](#footer)



## Features ✨
- **AI Interviewer:** Conducts real-time voice interviews using `@vapi-ai/web` and AI models like `gpt-4` and `gemini-2.0-flash-001`.
- **Customizable Interviews:** Allows users to practice interviews for specific roles, experience levels, and tech stacks. The questions can be technical, behavioral, or a mix of both.
- **Instant Feedback:** Provides detailed feedback on the candidate's performance, including overall impression, category-wise scores (Communication Skills, Technical Knowledge, Problem Solving, Cultural Fit, Confidence & Clarity), strengths, and areas for improvement.
- **Firebase Integration:** Uses Firebase for user authentication, data storage, and real-time updates.
- **Real-time transcript:** Display Real-time transcript of the interview.
- **Authentication:** Secure user authentication implemented using Firebase.
- **Dynamic Question Generation:** Leverages AI to generate interview questions based on specified criteria.
- **Session Management:** Utilizes session cookies for maintaining user sessions.



## Tech Stack 💻
- **Frontend:**
    - React: A JavaScript library for building user interfaces.
    - Next.js: A React framework for building server-rendered and statically generated web applications.
    - Tailwind CSS: A utility-first CSS framework for rapidly designing custom designs.
    - Typescript: Superset of JavaScript which primarily provides optional static typing, classes and interfaces.
    - Radix UI: A set of unstyled, accessible UI primitives.
    - Lucide React: A library of beautiful, consistent icons.
    - next-themes: Provides themes for Next.js Applications
    - sonner: An opinionated toast component for React.

- **Backend:**
    - Node.js: JavaScript runtime environment.
    - Express.js: A web application framework for Node.js.
    - Firebase: A backend-as-a-service (BaaS) platform.
    - Firebase Admin SDK: Enables interaction with Firebase from privileged environments.

- **AI SDKs:**
    - @ai-sdk/google: Used for integrating with Google's AI models.
    - ai:  A library for building AI-powered applications. Used for generating text and structured data.

- **Other:**
    - zod: TypeScript-first schema declaration with static type inference.
    - dayjs: A minimalist JavaScript date library.
    - class-variance-authority (cva):  A utility for writing class name variations with ease.
    - clsx: A tiny (239B) utility for constructing `className` strings conditionally.
    - tailwind-merge: Utility to merge Tailwind CSS classes in JS without style conflicts.
    - tailwindcss-animate: Tailwind CSS plugin for creating beautiful animation effects.
    - @hookform/resolvers: Integrates Zod schema validation with React Hook Form.



## Installation 🛠️
1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Harshit052610/prepify.git
    cd prepify
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Firebase:**

    -   Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    -   Enable Authentication and Firestore.
    -   Set up environment variables:

        Create a `.env.local` file in the root directory and add the following environment variables:

        ```
        NEXT_PUBLIC_FIREBASE_API_KEY=<your_firebase_api_key>
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your_firebase_project_id>
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
        NEXT_PUBLIC_FIREBASE_APP_ID=<your_firebase_app_id>
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your_firebase_measurement_id>
        FIREBASE_PROJECT_ID=<your_firebase_project_id>
        FIREBASE_CLIENT_EMAIL=<your_firebase_client_email>
        FIREBASE_PRIVATE_KEY=<your_firebase_private_key>
        NEXT_PUBLIC_VAPI_WEB_TOKEN=<your_vapi_web_token>
        ```

        **Note:** Ensure that you replace the placeholder values with your actual Firebase project credentials.

4.  **Run migrations:**

    -   No migrations are needed, Firebase automatically syncs



## Usage 🚀
1.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

2.  **Open your browser and navigate to `http://localhost:3000`** to access the application.
3.  **Sign up or sign in:** Use the authentication form to create a new account or log in with an existing one.
4.  **Start an Interview:** Start an interview using AI practice & feedback
5.  **Practice Interviews:** Start practicing interviews with AI by providing the required details like role, level, techstack etc
6.  **View Feedback:** After completing the interview, you can view detailed feedback on your performance.



### Real World Use Cases
*   **Job Interview Preparation**: Prepify allows candidates to practice answering technical and behavioral questions related to specific job roles and tech stacks, increasing confidence and improving interview skills.
*   **Skill Assessment**: Companies can use Prepify to quickly assess the skills of potential candidates, streamlining the hiring process and ensuring a better fit for the role.
*   **Personalized Learning**: Prepify offers personalized feedback and areas for improvement, helping users focus their learning efforts and track their progress over time.



## Project Structure 📂
```
prepify/
├── .idea/
├── .vscode/
├── app/
│   ├── (auth)/
│   ├── (root)/
│   ├── api/
├── components/
│   ├── ui/
├── constants/
├── firebase/
├── lib/
├── public/
├── styles/
├── types/
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
```

-   `app/`: Contains the Next.js application pages and routing.
    -   `(auth)`: Contains the authentication layouts and pages (sign-in, sign-up).
    -   `(root)`: Contains the main application layout and pages (dashboard, interview).
    -   `api`: Contains API endpoints for generating interview questions and handling data.
-   `components/`: Contains reusable React components.
    -   `ui/`: Contains primitive UI components built with Radix UI and Tailwind CSS.
-   `constants/`: Contains constant values used throughout the application, such as mappings for tech stack names and the interviewer AI configuration.
-   `firebase/`: Contains Firebase client and admin initialization code.
-   `lib/`: Contains utility functions and helper functions, such as actions for authenticating users and generating interview feedback.
-   `public/`: Contains static assets such as images and fonts.
-   `types/`: Contains TypeScript type definitions for the application.



## API Reference ℹ️



### `app/api/vapi/generate/route.ts`
-   **`POST`**: Generates interview questions based on the provided role, level, tech stack, and question type.

    ```typescript
    // Example request body:
    {
      "type": "Technical",
      "role": "Frontend Developer",
      "level": "Junior",
      "techstack": "React, TypeScript, Next.js",
      "amount": 5,
      "userid": "user123"
    }
    ```

    -   The endpoint uses the `@ai-sdk/google` and `ai` libraries to generate interview questions.
    -   It saves the generated interview data to Firestore.

-   **`GET`**: Returns a simple success message.



## Contributing 🤝
Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch with a descriptive name.
3.  Make your changes and test them thoroughly.
4.  Submit a pull request with a clear description of your changes.



## License 📜
This project has no license.



## Important Links 🔗
-   [Prepify Repository](https://github.com/Harshit052610/prepify)



## Footer <footer>
-   Author: Harshit
-   Contact: pushparavi1906@gmail.com
-   Repository: [Prepify](https://github.com/Harshit052610/prepify)

⭐️ Fork and star the repository to show your support! 🚀
