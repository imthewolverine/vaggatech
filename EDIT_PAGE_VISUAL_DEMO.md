# Edit Page Feature - Visual Walkthrough

## 🎬 User Journey

### Screen 1: Pages List
```
URL: http://localhost:3000/pages

┌─────────────────────────────────────────────────┐
│ Sidebar           Main Content                  │
│ ┌────────────┐ ┌──────────────────────────────┐│
│ │ Dashboard  │ │ Pages                        ││
│ │ Websites   │ │                              ││
│ │ Pages ◄    │ │ ┌──────────┐  ┌──────────┐  ││
│ │ Users      │ │ │ Home     │  │ About    │  ││
│ │ Templates  │ │ │ ┌──────┐ │  │ ┌──────┐ │  ││
│ │ Media      │ │ │ │      │ │  │ │      │ │  ││
│ │ Settings   │ │ │ └──────┘ │  │ └──────┘ │  ││
│ │ Billing    │ │ │Published │  │ Published│  ││
│ │ Activity   │ │ │ [Edit]   │  │ [Edit]   │  ││
│ └────────────┘ │ └──────────┘  └──────────┘  ││
│                │                              ││
│                │ ┌──────────┐  ┌──────────┐  ││
│                │ │ Services │  │ Contact  │  ││
│                │ │ ┌──────┐ │  │ ┌──────┐ │  ││
│                │ │ │      │ │  │ │      │ │  ││
│                │ │ └──────┘ │  │ └──────┘ │  ││
│                │ │ Draft    │  │ Published│  ││
│                │ │ [Edit]   │  │ [Edit]   │  ││
│                │ └──────────┘  └──────────┘  ││
│                └──────────────────────────────┘│
└─────────────────────────────────────────────────┘

USER CLICKS: [Edit] on "Home" page
```

### Screen 2: Edit Page - Full 3-Pane Editor
```
URL: http://localhost:3000/pages/1/edit

┌────────────────────────────────────────────────────────────────┐
│ ← Home  (Status: ✓ Published • Unsaved changes)               │
│ [Save Draft] [Publish]                                        │
├────────────────────────────────────────────────────────────────┤
│ SECTIONS       │ EDITOR FORM         │ PREVIEW              │
│ (Left)         │ (Center)            │ (Right)              │
├────────────────┼─────────────────────┼──────────────────────┤
│ #1 🎯 Hero     │ Edit Section        │ ┌────────────────┐  │
│    Welcome...  │                     │ │ Welcome to Our │  │
│ (selected)     │ Type: hero          │ │ Company        │  │
│ [●Duplicate]   │                     │ │                │  │
│ [✕Delete]      │ Heading:            │ │ We build modern│  │
│                │ [Welcome to Our..] │ │ software       │  │
│ #2 📝 Text     │                     │ │                │  │
│    We help...  │ Subheading:         │ │ [Get Started]  │  │
│                │ [We build...]       │ │                │  │
│ #3 ✨ Features │                     │ └────────────────┘  │
│    Our Services│ Button Text:        │                    │
│                │ [Get Started]       │ ┌────────────────┐  │
│ #4 🔔 CTA      │                     │ │ Our Services   │  │
│    Call to     │ Background:         │ │                │  │
│    Action      │ [#0F172A] [color] │ │ ✓ Web Dev      │  │
│                │                     │ ✓ Mobile Apps  │  │
│ ─────────────  │ [Save changes]      │ ✓ Consulting  │  │
│ + Add Section  │                     │ │                │  │
│                │                     │ └────────────────┘  │
│ [🎯 Hero]      │                     │                    │
│ [📝 Text]      │                     │ ┌────────────────┐  │
│ [✨ Features]  │                     │ │ We help        │  │
│ [🔔 CTA]       │                     │ │ businesses...  │  │
│                │                     │ │                │  │
│                │                     │ └────────────────┘  │
├────────────────┼─────────────────────┼──────────────────────┤
└────────────────────────────────────────────────────────────────┘

USER CHANGES:
- Click "Text" section #2
- Edit the text content
- Scroll right to see preview update in real-time
```

### Screen 3: After Editing "Text" Section
```
The preview on the right updates INSTANTLY:

BEFORE:                          AFTER:
┌──────────────────┐            ┌──────────────────┐
│ We help          │            │ We partner with  │
│ businesses grow  │    ──→      │ companies to     │
│ using technology │            │ transform their  │
│                  │            │ digital presence │
└──────────────────┘            └──────────────────┘

This is WYSIWYG - what you see in preview = what gets published
```

### Screen 4: Adding a New Section
```
USER CLICKS: [✨ Features] button in bottom-left

NEW SECTION ADDED:
┌────────────────────────────────────────────┐
│ SECTIONS                                   │
├────────────────────────────────────────────┤
│ #1 🎯 Hero                                 │
│ #2 📝 Text                                 │
│ #3 ✨ Features (Our Services)              │
│ #4 🔔 CTA                                  │
│ #5 ✨ Features (NEW) ◄── (auto-selected)  │
│    New Features      (blue highlight)     │
│                                            │
│ [●Duplicate] [✕Delete]                     │
│                                            │
│ + Add Section                              │
│   [🎯 Hero] [📝 Text] [✨ Features] [🔔 CTA]│
└────────────────────────────────────────────┘

CENTER PANEL:
┌─────────────────────────────────────┐
│ Section Title:                      │
│ [New Features]                      │
│                                     │
│ Features: [+ Add Feature]           │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ Title: Feature 1                ││
│ │ Description: Description        ││
│ │ [✕ Remove]                      ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### Screen 5: Save or Publish
```
USER CLICKS: [Save Draft]

STATUS:
- Dialog: "Page saved successfully!"
- Indicator changes from "Unsaved changes" → clean
- Button disables until next change

OR

USER CLICKS: [Publish]

STATUS:
- Dialog: "Page published successfully!"
- Status indicator: "✓ Published"
- Changes now live on www.acmecorp.com
```

### Screen 6: Back to Pages List
```
USER CLICKS: ← (back button)

URL: http://localhost:3000/pages

RESULT:
- Returns to pages list
- Changes are persisted
- Page shows "Published" status
- Ready to edit next page
```

---

## 🎨 Form Layouts by Section Type

### Hero Section Editor
```
┌─────────────────────────────────┐
│ Heading                         │
│ [Welcome to Our Company ────────]│
│                                 │
│ Subheading                      │
│ [We build modern software ─────]│
│                                 │
│ Button Text                     │
│ [Contact Us ────────────────────]│
│                                 │
│ Background Color                │
│ [■ #0F172A] [color selector] ──│
│                                 │
│ 💡 Tip: This hero section is    │
│    displayed prominently...     │
└─────────────────────────────────┘
```

### Text Section Editor
```
┌─────────────────────────────────┐
│ Content                         │
│ ┌─────────────────────────────┐ │
│ │ We help businesses grow...  │ │
│ │                             │ │
│ │ [Large textarea for text]   │ │
│ │                             │ │
│ │                             │ │
│ │                             │ │
│ └─────────────────────────────┘ │
│                                 │
│ 📝 Note: Plain text content     │
│    displayed in paragraph...    │
└─────────────────────────────────┘
```

### Features Section Editor
```
┌──────────────────────────────────┐
│ Section Title                    │
│ [Our Services ──────────────────]│
│                                  │
│ Features              [+ Add]    │
│ ┌────────────────────────────┐  │
│ │ Title: Web Development     │  │
│ │ Desc: Custom web apps      │  │
│ │ [✕ Remove]                 │  │
│ └────────────────────────────┘  │
│ ┌────────────────────────────┐  │
│ │ Title: Mobile Apps         │  │
│ │ Desc: iOS & Android dev    │  │
│ │ [✕ Remove]                 │  │
│ └────────────────────────────┘  │
│ ┌────────────────────────────┐  │
│ │ Title: Consulting          │  │
│ │ Desc: Tech strategy        │  │
│ │ [✕ Remove]                 │  │
│ └────────────────────────────┘  │
│                                  │
│ ✨ Tip: Features displayed      │
│    in grid layout...            │
└──────────────────────────────────┘
```

### CTA Section Editor
```
┌─────────────────────────────────┐
│ Heading                         │
│ [Take Action ──────────────────]│
│                                 │
│ Description                     │
│ ┌─────────────────────────────┐ │
│ │ Join us today and...        │ │
│ │                             │ │
│ │ [Text area]                 │ │
│ │                             │ │
│ └─────────────────────────────┘ │
│                                 │
│ Button Text                     │
│ [Join Us ──────────────────────]│
│                                 │
│ 🔔 Tip: CTA sections encourage │
│    visitors to take action...   │
└─────────────────────────────────┘
```

---

## 📊 State Flow Diagram

```
User opens /pages/1/edit
    ↓
useEffect: Load page JSON
    ↓
setSections([...])
setActiveId(sections[0].id)
    ↓
Render 3-pane layout
    ↓
User clicks section in left panel
    ↓
setActiveId(clickedId)
    ↓
SectionEditor renders editor for that type
    ↓
User types in form field
    ↓
onChange → handleUpdateSection()
    ↓
setSections([...updated...])
setIsDirty(true)
    ↓
PagePreview re-renders (same sections, fresh data)
    ↓
User sees changes instantly in preview
    ↓
[If more changes]
    → Repeat step 4-7
    ↓
[If ready to save]
    → User clicks "Save Draft"
    → handleSave()
    → await api.put(/pages/1, { sections })
    → setIsDirty(false)
    → Show success message
    ↓
[If ready to publish]
    → User clicks "Publish"
    → handlePublish()
    → await api.post(/pages/1/publish, { sections })
    → setStatus('published')
    → Show success message
```

---

## 🎯 Key Interactions

| Action | Result |
|--------|--------|
| Click Edit button on page list | Navigate to `/pages/[id]/edit` |
| Click section in left panel | Select it (highlight blue), show its editor |
| Type in form field | Update state, preview changes instantly |
| Click "Add Section" | New section added to bottom, auto-selected |
| Click "Duplicate" | Clone selected section, new section selected |
| Click "Delete" | Remove section, select previous section |
| Click "Save Draft" | Save to API, disable unsaved changes warning |
| Click "Publish" | Make live, show success message |
| Click back arrow | Return to pages list, changes persisted |

---

## 🏗️ Component Hierarchy

```
/pages/[pageId]/edit/page.tsx (Main)
├── Header
│   ├── Back Button
│   ├── Page Title
│   ├── Status Indicator
│   ├── "Save Draft" Button
│   └── "Publish" Button
│
└── Content (3-pane)
    ├── SectionsList (Left)
    │   ├── Section Items
    │   │   ├── Section Button
    │   │   ├── [Duplicate] Button
    │   │   └── [Delete] Button
    │   └── Add Section Buttons
    │
    ├── SectionEditor (Center)
    │   └── Dynamic Editor
    │       ├── HeroEditor
    │       ├── TextEditor
    │       ├── FeaturesEditor
    │       └── CTAEditor
    │
    └── PagePreview (Right)
        ├── Preview Container
        └── Section Renderers
            ├── HeroSection
            ├── TextSection
            ├── FeaturesSection
            └── CTASection
```

---

## ✨ That's It!

The Edit Page feature is **production-ready** with:

✅ Complete 3-pane layout
✅ Real-time form editing
✅ Live WYSIWYG preview
✅ Add/duplicate/delete sections
✅ Save draft & publish
✅ Type-safe editors
✅ Clean, scalable architecture

**Start editing now!** 🚀
