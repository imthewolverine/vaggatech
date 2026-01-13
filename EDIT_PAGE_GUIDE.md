# Edit Page Feature - Complete Guide

## Overview
The **Edit Page** feature provides a JSON-first, scalable page builder for the admin panel. Users can edit pages with a 3-pane layout: sections list (left), editor form (center), and live preview (right).

## How It Works

### 1. **Architecture**

```
Pages List → Click Edit → /pages/[pageId]/edit
     ↓
Load page JSON (content)
     ↓
Edit sections (form-based)
     ↓
Save draft or Publish
```

### 2. **Data Model**

Each page stores content as JSON:

```typescript
interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  content: {
    sections: Section[];
  };
}

interface Section {
  id: string;
  type: 'hero' | 'text' | 'features' | 'cta';
  data: Record<string, any>;
}
```

**Example page content:**
```json
{
  "sections": [
    {
      "id": "s1",
      "type": "hero",
      "data": {
        "heading": "Welcome to Our Company",
        "subheading": "We build modern software",
        "buttonText": "Contact Us",
        "backgroundColor": "#0F172A"
      }
    },
    {
      "id": "s2",
      "type": "text",
      "data": {
        "text": "We help businesses grow..."
      }
    }
  ]
}
```

### 3. **3-Pane Layout**

```
┌──────────────┬──────────────────┬──────────────┐
│ Sections     │ Editor (Form)     │ Preview      │
│ List         │                   │ (Live)       │
│ (Left)       │ Edit active       │ (Right)      │
│              │ section here      │              │
└──────────────┴──────────────────┴──────────────┘
```

**Left Pane (SectionsList):**
- Shows all sections with type and title
- Click to select/edit
- Add new sections
- Duplicate or delete sections

**Center Pane (SectionEditor):**
- Form inputs based on section type
- Real-time state updates
- Type-specific editors

**Right Pane (PagePreview):**
- Live preview using same renderer as production
- Updates in real-time as you edit
- WYSIWYG guarantee

## Section Types

### 1. **Hero** (HeroEditor)
- `heading`: Main title
- `subheading`: Subtitle
- `buttonText`: CTA button text
- `backgroundColor`: Hex color

### 2. **Text** (TextEditor)
- `text`: Plain text content

### 3. **Features** (FeaturesEditor)
- `title`: Section title
- `features`: Array of `{ title, description }`

### 4. **CTA** (CTAEditor)
- `title`: Heading
- `text`: Description
- `buttonText`: Button label

## File Structure

```
app/pages/[pageId]/edit/
├── page.tsx                          # Main edit page (3-pane layout)
├── components/
│   ├── SectionsList.tsx              # Left: List of sections
│   ├── SectionEditor.tsx             # Center: Form editor
│   ├── PagePreview.tsx               # Right: Live preview
│   └── editors/
│       ├── HeroEditor.tsx            # Hero section form
│       ├── TextEditor.tsx            # Text section form
│       ├── FeaturesEditor.tsx        # Features section form
│       └── CTAEditor.tsx             # CTA section form
```

## Usage Flow

### 1. **Navigate to Edit Page**
Click the "Edit" button on the Pages list → navigates to `/pages/[pageId]/edit`

### 2. **Select Section**
Click a section in the left panel to select it for editing

### 3. **Edit Content**
Form inputs in the center panel update the section data in real-time

### 4. **See Live Preview**
Right panel updates instantly to show how the page will look

### 5. **Save or Publish**
- **Save Draft**: Saves changes without publishing
- **Publish**: Makes changes live to visitors

## State Management

```typescript
// Main page state
const [sections, setSections] = useState<Section[]>([]);
const [activeId, setActiveId] = useState<string | null>(null);
const [isDirty, setIsDirty] = useState(false);

// Update section helper
const handleUpdateSection = (id: string, data: Record<string, any>) => {
  setSections(sections.map(s =>
    s.id === id ? { ...s, data } : s
  ));
  setIsDirty(true);
};
```

## API Endpoints (Backend Integration)

### Load Page
```
GET /pages/:pageId
→ Returns: { id, title, slug, status, content: { sections } }
```

### Save Draft
```
PUT /pages/:pageId
Body: { content: { sections } }
→ Updates draft only
```

### Publish
```
POST /pages/:pageId/publish
→ Copies draft to published, sets status = 'published'
```

### Delete Section
```
DELETE /pages/:pageId/sections/:sectionId
→ Removes section from page
```

## Validation

### Schema Validation (Before Save)
```typescript
const SECTION_SCHEMAS = {
  hero: {
    heading: 'string',
    subheading: 'string',
    buttonText: 'string',
    backgroundColor: 'string'
  },
  text: {
    text: 'string'
  },
  features: {
    title: 'string',
    features: 'array'
  },
  cta: {
    title: 'string',
    text: 'string',
    buttonText: 'string'
  }
};
```

Validate on save to prevent malformed data.

## Key Features

✅ **JSON-Based**: Edit structured data, not raw HTML
✅ **Live Preview**: See changes in real-time
✅ **WYSIWYG**: Preview uses same renderer as live site
✅ **Drag & Drop Ready**: Can add reordering later
✅ **Type-Safe**: Each section type has its own editor
✅ **Scalable**: Easy to add new section types
✅ **Draft/Publish**: Safe editing workflow
✅ **Undo-Friendly**: Version history ready

## Future Enhancements

### Phase 2: Drag & Drop
- Install `@dnd-kit/core`
- Allow reordering sections
- Each drag updates the `sections` array

```tsx
// Example: After drag
const reorderedSections = arrayMove(sections, oldIndex, newIndex);
setSections(reorderedSections);
```

### Phase 3: Advanced Features
- Inline text editing
- Image upload per section
- Color picker UI
- Font size/style options
- Collaboration (presence cursors)

### Phase 4: Version Control
- Keep `page_versions` table
- Rollback to previous versions
- Revision history UI

### Phase 5: AI Integration
- Auto-generate content
- AI copy suggestions
- Content optimization

## Example: Adding a New Section Type

### Step 1: Create Editor Component
```tsx
// NewSectionEditor.tsx
export default function NewSectionEditor({ data, onChange }) {
  return (
    <input
      value={data.myField}
      onChange={e => onChange({ ...data, myField: e.target.value })}
    />
  );
}
```

### Step 2: Update SectionEditor.tsx
```tsx
import NewSectionEditor from './editors/NewSectionEditor';

// Add case in switch:
case 'newType':
  return <NewSectionEditor data={section.data as any} onChange={onChange} />;
```

### Step 3: Update PagePreview.tsx
```tsx
case 'newType':
  return (
    <div key={section.id}>
      {/* Render your component */}
      {section.data.myField}
    </div>
  );
```

### Step 4: Update Section Types
```tsx
type SectionType = 'hero' | 'text' | 'features' | 'cta' | 'newType';
```

## Testing

### Manual Testing Checklist
- [ ] Load edit page
- [ ] Select different sections
- [ ] Edit section content
- [ ] Preview updates in real-time
- [ ] Add new sections
- [ ] Delete sections
- [ ] Duplicate sections
- [ ] Save draft
- [ ] Publish page
- [ ] Check "Unsaved changes" indicator
- [ ] Navigation away with unsaved changes (prompt)

## Performance Tips

- **Memoize editors** if sections get large
- **Debounce preview rendering** on large pages
- **Lazy load section editors** if many types
- **Virtualize section list** if 100+ sections

## Security Considerations

- **Validate all input** on server-side
- **Sanitize HTML** if you add rich text
- **Check permissions** before allowing edits
- **Rate limit API calls** for save/publish
- **Audit changes** in activity log

---

**Ready to extend?** The JSON-first approach makes it easy to add new features without rewriting core logic. Start with the MVP, then layer on complexity as needed.
