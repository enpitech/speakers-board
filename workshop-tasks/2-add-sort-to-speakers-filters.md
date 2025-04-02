# Task: Add Sorting Functionality to Speaker Filters

## Overview

Add sorting capabilities to the speakers table by extending the existing filters system. This will allow users to sort speakers by various criteria like name, rating, and experience.

## Requirements

### 1. Update Types

- Add a new type for sort options in `app/lib/types.ts`:

```typescript
type SortOption = {
  field: 'name' | 'rating' | 'experience';
  direction: 'asc' | 'desc';
};
```

### 2. Extend Filter Hook

- Modify `useSpeakersFilters` hook to include sorting functionality:
  - Add sort state to the filters
  - Add handlers for sort changes
  - Update URL search params to include sort parameters

### 3. Add Sort UI Component

- Create a new sort dropdown in the `SpeakersFilters` component
- Add it alongside existing language and topic filters
- Style it consistently with other filter components

### 4. Update Loader

- Modify the speakers loader to handle sort parameters
- Update the query to sort speakers based on selected criteria

### 5. Update Table Component

- Ensure the table component respects the sort order
- Add visual indicators for sort direction

## Implementation Steps

1. First, update the types:

```typescript
// app/lib/types.ts
export interface SpeakersDashboardFilters {
  language: string[];
  topic: string[];
  rating: number | null;
  sort: {
    field: 'name' | 'rating' | 'experience';
    direction: 'asc' | 'desc';
  };
}
```

2. Extend the `useSpeakersFilters` hook:

```typescript
// app/lib/hooks/useSpeakersFilters.ts
const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
  const newFilters = { ...filters };
  newFilters.sort = { field, direction };
  setFilters(newFilters);
};
```

3. Add the sort UI to `SpeakersFilters`:

```typescript
// app/components/SpeakersFilters.tsx
<div className="flex-1">
  <Select
    value={filters.sort.field}
    onValueChange={(value) => handleSortChange(value, filters.sort.direction)}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Sort by" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="name">Name</SelectItem>
      <SelectItem value="rating">Rating</SelectItem>
      <SelectItem value="experience">Experience</SelectItem>
    </SelectContent>
  </Select>
</div>
```

4. Update the loader to handle sorting:

```typescript
// app/lib/loaders/speakers.loader.ts
const sortSpeakers = (speakers: Speaker[], sort: SortOption) => {
  return [...speakers].sort((a, b) => {
    const direction = sort.direction === 'asc' ? 1 : -1;
    return a[sort.field] > b[sort.field] ? direction : -direction;
  });
};
```

## Success Criteria

- ✅ Sort dropdown appears in the filters section
- ✅ Sort state is properly maintained in URL parameters
- ✅ Speakers are correctly sorted based on selected criteria
- ✅ Sort direction is visually indicated
- ✅ Sort persists across page refreshes
- ✅ Sort works in combination with existing filters

## Testing Requirements

1. Test sort functionality:

   - Verify sorting by each field (name, rating, experience)
   - Verify sort direction changes
   - Verify sort persistence in URL
   - Verify sort works with existing filters

2. Test edge cases:
   - Empty sort selection
   - Multiple sort changes
   - Sort with no data

## Notes

- Maintain consistent styling with existing filter components
- Ensure sort indicators are accessible
- Consider adding keyboard navigation for sort controls
- Document any new types or interfaces
- Follow the project's existing patterns for state management

---

# משימה: הוספת פונקציונליות מיון לפילטרי הדוברים

## סקירה

הוספת יכולות מיון לטבלת הדוברים על ידי הרחבת מערכת הפילטרים הקיימת. זה יאפשר למשתמשים למיין דוברים לפי קריטריונים שונים כמו שם, דירוג וניסיון.

## דרישות

### 1. עדכון טיפוסים

- הוספת טיפוס חדש לאפשרויות מיון ב-`app/lib/types.ts`:

```typescript
type SortOption = {
  field: 'name' | 'rating' | 'experience';
  direction: 'asc' | 'desc';
};
```

### 2. הרחבת Hook הפילטרים

- שינוי ה-`useSpeakersFilters` hook כדי לכלול פונקציונליות מיון:
  - הוספת מצב מיון לפילטרים
  - הוספת מטפלים לשינויים במיון
  - עדכון פרמטרי חיפוש ה-URL כדי לכלול פרמטרי מיון

### 3. הוספת רכיב ממשק משתמש למיון

- יצירת תפריט נפתח למיון ברכיב `SpeakersFilters`
- הוספתו לצד פילטרי השפה והנושא הקיימים
- עיצובו באופן עקבי עם רכיבי הפילטר האחרים

### 4. עדכון Loader

- שינוי ה-loader של הדוברים כדי לטפל בפרמטרי מיון
- עדכון השאילתה למיין דוברים לפי הקריטריונים שנבחרו

### 5. עדכון רכיב הטבלה

- וידוא שרכיב הטבלה מכבד את סדר המיון
- הוספת אינדיקטורים ויזואליים לכיוון המיון

## שלבי מימוש

1. ראשית, עדכון הטיפוסים:

```typescript
// app/lib/types.ts
export interface SpeakersDashboardFilters {
  language: string[];
  topic: string[];
  rating: number | null;
  sort: {
    field: 'name' | 'rating' | 'experience';
    direction: 'asc' | 'desc';
  };
}
```

2. הרחבת ה-`useSpeakersFilters` hook:

```typescript
// app/lib/hooks/useSpeakersFilters.ts
const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
  const newFilters = { ...filters };
  newFilters.sort = { field, direction };
  setFilters(newFilters);
};
```

3. הוספת ממשק המשתמש למיון ל-`SpeakersFilters`:

```typescript
// app/components/SpeakersFilters.tsx
<div className="flex-1">
  <Select
    value={filters.sort.field}
    onValueChange={(value) => handleSortChange(value, filters.sort.direction)}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="מיין לפי" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="name">שם</SelectItem>
      <SelectItem value="rating">דירוג</SelectItem>
      <SelectItem value="experience">ניסיון</SelectItem>
    </SelectContent>
  </Select>
</div>
```

4. עדכון ה-loader לטיפול במיון:

```typescript
// app/lib/loaders/speakers.loader.ts
const sortSpeakers = (speakers: Speaker[], sort: SortOption) => {
  return [...speakers].sort((a, b) => {
    const direction = sort.direction === 'asc' ? 1 : -1;
    return a[sort.field] > b[sort.field] ? direction : -direction;
  });
};
```

## קריטריוני הצלחה

- ✅ תפריט המיון מופיע באזור הפילטרים
- ✅ מצב המיון נשמר כראוי בפרמטרי ה-URL
- ✅ הדוברים ממוינים נכון לפי הקריטריונים שנבחרו
- ✅ כיוון המיון מוצג ויזואלית
- ✅ המיון נשמר בין רענוני דף
- ✅ המיון עובד בשילוב עם הפילטרים הקיימים

## דרישות בדיקה

1. בדיקת פונקציונליות המיון:

   - אימות מיון לפי כל שדה (שם, דירוג, ניסיון)
   - אימות שינוי כיוון המיון
   - אימות שמירת המיון ב-URL
   - אימות פעולת המיון עם הפילטרים הקיימים

2. בדיקת מקרי קצה:
   - בחירת מיון ריקה
   - שינויי מיון מרובים
   - מיון ללא נתונים
