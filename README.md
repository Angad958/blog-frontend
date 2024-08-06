# Blog Frontend

This project is the frontend for a personal blog platform where users can sign up, log in, and post articles. This is built using Next.js and TypeScript.

## Setup Instructions

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Angad958/blog-frontend.git
   cd blog-frontend
2. Install the dependencies:
    ```bash
   npm install
3. Create a .env file in the root directory with the following content:
    ```bash
   NEXT_PUBLIC_BASE_URL="http://localhost:3000/api"
5. Start the application:<br>
    make sure the backend is running 
    ```bash
    yarn run dev

 ### Project Structure

```
blog-frontend/
  .next/
  app/
    (components)/
      CreatePostModal.tsx
      Header.tsx
      Loader.tsx
      PostCard.tsx
      withAuth.tsx
    (context)/
      AuthContext.tsx
    (utils)/
      api/
        APIHandler.ts
        useAPI.ts
      dateutils/
        timeStampToDate.ts
      interfaces/
        interfaces.ts
      navigation/
        navigation.tsx
    dashboard/
    login/
    post/
    signup/
  node_modules/
  public/
  .env
  .eslintrc.json
  .gitignore
  next.config.mjs
  package.json
  postcss.config.mjs
  README.md
  tailwind.config.ts
  tsconfig.json
  yarn.lock
```
### Explanation of Project Directories

* `.next/`: Contains the build output from Next.js.
* `app/`: Main application folder.
  * `(components)`: Contains all React components.
  * `(context)`: Contains context providers for state management.
  * `(utils)`: Contains utility functions and hooks.
  * `api/`: Contains API handler and hooks.
  * `dateutils/`: Contains date utility functions.
  * `interfaces/`: Contains TypeScript interfaces.
  * `navigation/`: Contains navigation helper.
  * `dashboard/`: Contains dashboard-related pages.
  * `login/`: Contains login page.
  * `post/`: Contains post-related pages.
  * `signup/`: Contains signup page.
* `public/`: Contains public assets.
* `.env`: Environment variables file.
* `.eslintrc.json`: ESLint configuration file.
* `.gitignore`: Specifies files and directories that should be ignored by Git.
* `next.config.mjs`: Next.js configuration file.
* `package.json`: Contains project metadata and dependencies.
* `postcss.config.mjs`: PostCSS configuration file.
* `README.md`: This file, providing project documentation.
* `tailwind.config.ts`: Tailwind CSS configuration file.
* `tsconfig.json`: TypeScript configuration file.
* `yarn.lock`: Yarn lock file for dependency management.


**Development Choices**

* **Next.js**: Chosen for its simplicity and powerful features like:
	+ SSR (Server-Side Rendering)
	+ SSG (Static Site Generation)
* **TypeScript**: Chosen for its:
	+ Static typing
	+ Improved developer experience
* **Tailwind CSS**: Chosen for its:
	+ Utility-first CSS framework
	+ Quickly building responsive and modern user interfaces

API Endpoints
============

### Authentication

* **POST /signup**: Registers a new user with email and password.
* **POST /login**: Authenticates a user and returns a session token.

### Posts

* **POST /posts**: Allows authenticated users to post a new article.
* **GET /posts**: Retrieves all posts.
* **GET /posts?author=userId**: Retrieves posts by a specific author.

License
=======

This project is licensed under the **MIT License**.
