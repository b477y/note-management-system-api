# Note Management System API

### Installation

1.  Clone the repository: `git clone https://github.com/b477y/note-management-system-api`
2.  Navigate to the project directory: `cd note-management-system-api`
3.  Install dependencies: `npm install`

### Configuration

1.  **Create your `.env` file:** Copy the provided `.env.example` file and rename it to `.env`.
2.  **Edit `.env`:** Open the newly created `.env` file and replace the placeholder values with your actual configuration.

### Running the App

- **Development Mode (with hot-reloading):**
  ```bash
  npm run dev
  ```
- **Production Mode:**
  ```bash
  npm start
  ```

---

## API Endpoints

**Base URL:** `http://localhost:3000`

### REST Endpoints:

- **Authentication:**
  - `POST /auth/register`
  - `POST /auth/login`
  - `POST /auth/forget-password`
  - `POST /auth/reset-password`
  - `POST /auth/logout`
- **Note Management:**
  - `POST /notes/`
  - `POST /notes/:id/summarize`
  - `DELETE /notes/:id`
- **User Profile:**
  - `PATCH /user/upload-profile-pic`

### GraphQL Endpoint:

- **Endpoint:** `http://localhost:3000/graphql`
- **Description:** A single endpoint for querying notes with advanced filtering (by `userId`, `title`, `startDate`, `endDate`), pagination (`page`, `limit`), and nested owner details.

**Example GraphQL Query:**

```graphql
query GetNotes {
  getNotes(
    userId: "68858223e82e605f6958473a"
    title: "Route task"
    startDate: "2025-07-27"
    endDate: "2025-07-28"
    page: 2
    limit: 2
  ) {
    _id
    title
    content
    ownerId
    createdAt
    updatedAt
    owner {
      _id
      email
      profilePicture
      deletedAt
      changeCredentialsTime
      createdAt
      updatedAt
    }
  }
}
```
