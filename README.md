# Architecture GNDC

## 1. Frontend (React + TypeScript)

### Composants React
```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   └── Modal/
│   ├── layout/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   └── Sidebar/
│   └── features/
│       ├── auth/
│       ├── events/
│       ├── projects/
│       └── blog/
├── pages/
│   ├── Home/
│   ├── Events/
│   ├── Projects/
│   ├── Blog/
│   ├── Contact/
│   └── Dashboard/
└── contexts/
    ├── AuthContext/
    └── LanguageContext/
```

### État Global (Redux)
```
store/
├── slices/
│   ├── auth.slice.ts
│   ├── events.slice.ts
│   ├── projects.slice.ts
│   └── blog.slice.ts
└── services/
    ├── api.service.ts
    └── storage.service.ts
```

## 2. Backend (Node.js + Express)

```
src/
├── config/
│   ├── database.ts
│   └── environment.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   ├── event.controller.ts
│   ├── project.controller.ts
│   └── blog.controller.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── validation.middleware.ts
│   └── error.middleware.ts
├── models/
│   ├── user.model.ts
│   ├── event.model.ts
│   ├── project.model.ts
│   └── blog.model.ts
├── routes/
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   ├── event.routes.ts
│   ├── project.routes.ts
│   └── blog.routes.ts
└── services/
    ├── auth.service.ts
    ├── email.service.ts
    └── storage.service.ts
```

## 3. Base de données (MongoDB)

### Collections
- users
- events
- projects
- posts
- comments
- newsletters

### Schémas

```typescript
// User
{
  _id: ObjectId,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: "admin" | "member",
  expertise: string[],
  city: string,
  joinedAt: Date
}

// Event
{
  _id: ObjectId,
  title: string,
  description: string,
  type: "hackathon" | "formation" | "meetup",
  date: Date,
  location: string,
  maxParticipants: number,
  participants: ObjectId[],
  status: "upcoming" | "ongoing" | "completed"
}

// Project
{
  _id: ObjectId,
  title: string,
  description: string,
  technologies: string[],
  githubUrl: string,
  contributors: ObjectId[],
  status: "active" | "completed" | "paused"
}

// Post
{
  _id: ObjectId,
  title: string,
  content: string,
  author: ObjectId,
  category: string,
  tags: string[],
  publishedAt: Date
}
```

## 4. API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

### Users
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id

### Events
- GET /api/events
- POST /api/events
- GET /api/events/:id
- PUT /api/events/:id
- DELETE /api/events/:id
- POST /api/events/:id/register

### Projects
- GET /api/projects
- POST /api/projects
- GET /api/projects/:id
- PUT /api/projects/:id
- DELETE /api/projects/:id
- POST /api/projects/:id/contribute

### Blog
- GET /api/posts
- POST /api/posts
- GET /api/posts/:id
- PUT /api/posts/:id
- DELETE /api/posts/:id
- POST /api/posts/:id/comments

## 5. Fonctionnalités Principales

### Authentification & Autorisation
- Inscription/Connexion
- Gestion des rôles
- JWT + Refresh Tokens

### Gestion des Événements
- CRUD événements
- Inscription aux événements
- Rappels automatiques
- Génération certificats

### Gestion des Projets
- CRUD projets
- Intégration GitHub
- Suivi contributions
- Documentation

### Blog & Ressources
- CRUD articles
- Système commentaires
- Recherche & filtrage
- Rich text editor

### Administration
- Dashboard analytics
- Gestion membres
- Modération contenu
- Rapports & stats