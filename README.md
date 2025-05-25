# **Spy Cat Agency Frontend (Next.js App Router)**

## **Description**

This frontend application uses **Next.js App Router** (introduced in Next.js 13+) to build a modern, scalable interface for managing spy cats, missions, and targets. The App Router allows file-based routing with React Server Components, layouts, and improved data fetching capabilities.

---

## **Features**

- Nested layouts and pages using the Next.js App Router (`app/` directory)
- Server and client components mixed seamlessly
- Dynamic routes for cats and missions management
- API integration with backend REST endpoints
- Form handling and validation on client components
- Styling with Tailwind CSS

---

## **Technology Stack**

- **Next.js 15+** with App Router (`app/` directory)
- **React 18** with Server and Client Components
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **API:** REST API from Spy Cat Agency backend
- **Other:** Axios, react-hook-form

---

## Running the Project

1. **Clone the repository:**

```cmd
    git clone https://github.com/Fialex1212/SCA-frontend.git
    cd spy-cat-frontend
```

2. **Install dependencies:**

```cmd
    yarn install .
```

3. **Add environment variables in .env.local:**

```cmd
    NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8001/
```

4. **Run the development server:**

```cmd
    yarn dev
```

## **Folder Structure**

```bash
/app                   - Next.js App Router pages and layouts
/app/layout.tsx        - Root layout for app-wide UI (e.g. header, footer)
/app/(pp)/cats         - Cats-related pages and components
/app/(app)/missions    - Missions-related pages and components
/components            - Reusable client components
/api                   - API helper functions, fetch utilities
/public                - Static assets like images and icons
```

## **Routing Examples**

/cats                          - List all spy cats
/cats/new                      - Create new a spy cat
/cats/[catId]                  - View a single cat
/cats/[catId]/update           - Update a single cat
/missions                      - List all missions
/missions/new                  - Create new a missions
/missions/[missionId]          - View a single mission
/missions/[missionId]/update   - Update a single mission
/missions/[missionId]/assign   - Assign a cat to a mission

## Validation Notes

- Cat breed must be validated against TheCatAPI breed list before creation.
- Mission creation requires 1 to 3 targets.
- Target notes cannot be updated if the target or mission is completed.
- A cat cannot be assigned to more than one mission at a time.

## Contact

For questions or contributions, please contact:

- **Developer:** - [@Aleks Seriakov](https://github.com/Fialex1212)
- **Email:** aleks.seriakov@gmail.com
