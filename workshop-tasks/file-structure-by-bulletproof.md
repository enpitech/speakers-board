I'll help you create a workshop task list based on the Bulletproof React project structure documentation. I'll break it down into clear, actionable tasks that will help participants understand and implement a scalable React project structure.

## Task 1: Initial Project Setup

1. Create a new React project using your preferred method (Create React App, Vite, or Next.js)
2. Set up the following root-level directories in the `src` folder:
   - `app`
   - `assets`
   - `components`
   - `config`
   - `features`
   - `hooks`
   - `lib`
   - `stores`
   - `types`
   - `utils`

## Task 2: Application Layer Setup

1. In the `app` directory, create the following files:
   - `app.tsx` - Main application component
   - `provider.tsx` - Global providers wrapper
   - `router.tsx` - Router configuration
2. Set up basic routing configuration using React Router
3. Create a simple provider wrapper that will later contain global providers

## Task 3: Feature Module Implementation

1. Create a sample feature called "auth" in the `features` directory with the following structure:
   ```
   src/features/auth/
   ├── api/
   ├── components/
   ├── hooks/
   ├── types/
   └── utils/
   ```
2. Implement a basic authentication feature with:
   - Login form component
   - Authentication API calls
   - Custom hooks for auth state management
   - Type definitions for auth-related data

## Task 4: Shared Components

1. Create reusable UI components in the `components` directory:
   - Button component
   - Input component
   - Card component
2. Implement proper TypeScript types for component props
3. Ensure components are properly exported for use across the application

## (OPTIONAL) Task 5: ESLint Configuration (OPTIONAL)

1. Set up ESLint in your project
2. Configure import restrictions to:
   - Prevent cross-feature imports
   - Enforce unidirectional code flow
3. Add the following ESLint rules:
   ```javascript
   'import/no-restricted-paths': [
     'error',
     {
       zones: [
         {
           target: './src/features',
           from: './src/app',
         },
         {
           target: [
             './src/components',
             './src/hooks',
             './src/lib',
             './src/types',
             './src/utils',
           ],
           from: ['./src/features', './src/app'],
         }
       ]
     }
   ]
   ```

## Task 6: Feature Integration

1. Create a second feature module called "profile"
2. Implement the feature using the same structure as the auth feature
3. Practice proper code organization by:
   - Keeping feature-specific code within the feature directory
   - Using shared components from the `components` directory
   - Following the unidirectional data flow pattern

## Task 7: State Management

1. Set up a global state management solution in the `stores` directory
2. Create separate store slices for:
   - Authentication state
   - User preferences
3. Implement proper TypeScript types for state management

## Bonus Tasks

1. Implement proper error handling across the application
2. Add loading states and skeleton components
3. Set up a testing environment and write tests for components
4. Create documentation for the project structure
5. Implement environment configuration in the `config` directory

## Success Criteria

- ✅ Project follows the prescribed directory structure
- ✅ Features are properly isolated with no cross-feature imports
- ✅ ESLint rules are properly configured and passing
- ✅ Components are reusable and properly typed
- ✅ State management is implemented following best practices
- ✅ Code follows unidirectional flow pattern
- ✅ All features are working as expected

## Notes

- Ensure all imports are direct (avoid barrel files for better tree shaking)
- Keep feature modules independent and composable at the application level
- Follow TypeScript best practices throughout the project
- Consider performance implications when structuring the application
- Document any deviations from the standard structure and their reasoning

This workshop structure will help participants understand and implement a scalable, maintainable React application architecture following the Bulletproof React guidelines.

//////

# סדנת מבנה פרויקט React

## משימה 1: התקנה ראשונית של הפרויקט

1. צור פרויקט React חדש באמצעות השיטה המועדפת עליך (Create React App, Vite, או Next.js)
2. הגדר את תיקיות הבסיס הבאות בתיקיית `src`:
   - `app`
   - `assets`
   - `components`
   - `config`
   - `features`
   - `hooks`
   - `lib`
   - `stores`
   - `types`
   - `utils`

## משימה 2: הגדרת שכבת האפליקציה

1. בתיקיית `app`, צור את הקבצים הבאים:
   - `app.tsx` - קומפוננטת האפליקציה הראשית
   - `provider.tsx` - עוטף ספקים גלובלי
   - `router.tsx` - תצורת הניתוב
2. הגדר תצורת ניתוב בסיסית באמצעות React Router
3. צור עוטף ספקים פשוט שיכיל בהמשך ספקים גלובליים

## משימה 3: מימוש מודול תכונה

1. צור תכונה לדוגמה בשם "auth" בתיקיית `features` עם המבנה הבא:
   ```
   src/features/auth/
   ├── api/
   ├── components/
   ├── hooks/
   ├── types/
   └── utils/
   ```
2. ממש תכונת אימות בסיסית עם:
   - קומפוננטת טופס התחברות
   - קריאות API לאימות
   - hooks מותאמים אישית לניהול מצב האימות
   - הגדרות טיפוסים עבור נתוני האימות

## משימה 4: קומפוננטות משותפות

1. צור קומפוננטות UI לשימוש חוזר בתיקיית `components`:
   - קומפוננטת כפתור
   - קומפוננטת קלט
   - קומפוננטת כרטיס
2. ממש טיפוסי TypeScript מתאימים עבור props של הקומפוננטות
3. וודא שהקומפוננטות מיוצאות כראוי לשימוש בכל האפליקציה

## משימה 5: תצורת ESLint

1. הגדר ESLint בפרויקט שלך
2. הגדר הגבלות ייבוא כדי:
   - למנוע ייבוא בין תכונות
   - לאכוף זרימת קוד חד-כיוונית
3. הוסף את כללי ESLint הבאים:
   ```javascript
   'import/no-restricted-paths': [
     'error',
     {
       zones: [
         {
           target: './src/features',
           from: './src/app',
         },
         {
           target: [
             './src/components',
             './src/hooks',
             './src/lib',
             './src/types',
             './src/utils',
           ],
           from: ['./src/features', './src/app'],
         }
       ]
     }
   ]
   ```

## משימה 6: שילוב תכונות

1. צור מודול תכונה שני בשם "profile"
2. ממש את התכונה באמצעות אותו מבנה כמו תכונת האימות
3. תרגל ארגון קוד נכון על ידי:
   - שמירת קוד ספציפי לתכונה בתוך תיקיית התכונה
   - שימוש בקומפוננטות משותפות מתיקיית `components`
   - מעקב אחר תבנית זרימת נתונים חד-כיוונית

## משימה 7: ניהול מצב

1. הגדר פתרון ניהול מצב גלובלי בתיקיית `stores`
2. צור חלקי store נפרדים עבור:
   - מצב אימות
   - העדפות משתמש
3. ממש טיפוסי TypeScript מתאימים לניהול מצב

## משימות בונוס

1. ממש טיפול בשגיאות נכון בכל האפליקציה
2. הוסף מצבי טעינה ורכיבי שלד
3. הגדר סביבת בדיקות וכתוב בדיקות לקומפוננטות
4. צור תיעוד למבנה הפרויקט
5. ממש תצורת סביבה בתיקיית `config`

## קריטריוני הצלחה

- ✅ הפרויקט עוקב אחר מבנה התיקיות המוגדר
- ✅ התכונות מבודדות כראוי ללא ייבוא בין תכונות
- ✅ כללי ESLint מוגדרים כראוי ועוברים
- ✅ הקומפוננטות ניתנות לשימוש חוזר ומוגדרות טיפוסים כראוי
- ✅ ניהול המצב מיושם לפי שיטות עבודה מומלצות
- ✅ הקוד עוקב אחר תבנית זרימה חד-כיוונית
- ✅ כל התכונות עובדות כמצופה

## הערות

- וודא שכל הייבוא הוא ישיר (הימנע מקבצי barrel לטובת tree shaking טוב יותר)
- שמור על מודולי תכונות עצמאיים וניתנים להרכבה ברמת האפליקציה
- עקוב אחר שיטות העבודה המומלצות של TypeScript לאורך כל הפרויקט
- שקול השלכות ביצועים בעת מבנה האפליקציה
- תעד כל סטייה מהמבנה הסטנדרטי והסיבות לכך

מבנה סדנה זה יעזור למשתתפים להבין ולממש ארכיטקטורת אפליקציית React הניתנת להרחבה ותחזוקה בהתאם להנחיות Bulletproof React.
