# Header Dataset Upload Feature

## 🎯 Overview

The AgriAI platform now features a **global dataset upload** functionality in the header bar, allowing users to upload custom CSV datasets from any page. The uploaded dataset is shared across all pages and components, enabling consistent predictions based on user-provided data.

---

## ✨ Key Features

### 1. Global Accessibility
- **Location**: Header bar (top-right, next to theme toggle)
- **Availability**: Accessible from all pages
- **Persistence**: Dataset remains loaded across page navigation
- **Visibility**: Upload status always visible in header

### 2. Smart Upload Button
**Default State** (No Dataset):
- Upload icon with "Upload Dataset" text (desktop)
- Upload icon only (mobile)
- Ghost button style for minimal design
- Click to open file picker

**Uploaded State**:
- Green success indicator
- Record count display (e.g., "31 records")
- Clear button (X icon) to remove dataset
- Compact design to save space

### 3. Real-time Feedback
- Toast notifications for all actions
- Success message with record count
- Error messages for invalid files
- Clear feedback when dataset is removed

---

## 🏗️ Architecture

### Global State Management

#### DatasetContext
**File**: `src/contexts/DatasetContext.tsx`

**Purpose**: Provides global state for uploaded datasets

**Features**:
- Centralized dataset storage
- React Context API for state sharing
- Type-safe with TypeScript
- Easy access from any component

**API**:
```typescript
interface DatasetContextType {
  uploadedDataset: UploadedDataset | null;
  setUploadedDataset: (dataset: UploadedDataset | null) => void;
  isDatasetUploaded: boolean;
}
```

**Usage**:
```typescript
import { useDataset } from '@/contexts/DatasetContext';

const { uploadedDataset, setUploadedDataset, isDatasetUploaded } = useDataset();
```

### Component Structure

#### DatasetUpload Component
**File**: `src/components/common/DatasetUpload.tsx`

**Responsibilities**:
- File input handling
- CSV parsing and validation
- Upload state management
- User feedback (toasts)
- Clear dataset functionality

**Features**:
- Hidden file input (styled button trigger)
- CSV format validation
- Error handling
- Success/error notifications
- Responsive design

---

## 📊 Data Flow

### Upload Process
```
User clicks "Upload Dataset"
    ↓
File picker opens
    ↓
User selects CSV file
    ↓
File validation (CSV check)
    ↓
Read file content
    ↓
Parse CSV data
    ↓
Validate data structure
    ↓
Create UploadedDataset object
    ↓
Store in global context
    ↓
Show success toast
    ↓
Update header display
    ↓
All pages use uploaded data
```

### Clear Process
```
User clicks clear button (X)
    ↓
Remove dataset from context
    ↓
Show cleared toast
    ↓
Update header display
    ↓
All pages revert to default data
```

---

## 🎨 UI/UX Design

### Desktop Layout (≥1280px)
```
[Logo] [Nav Links...] | [Upload Dataset] [Theme Toggle]
                       ↑
                  Separator
```

**Uploaded State**:
```
[Logo] [Nav Links...] | [✓ 31 records] [X] [Theme Toggle]
```

### Mobile Layout (<1280px)
```
[Logo]  [Upload Icon] [Theme Icon] [Menu]
```

**Uploaded State**:
```
[Logo]  [✓ 31] [X] [Theme Icon] [Menu]
```

### Visual Styling

#### Upload Button
- Ghost variant (transparent background)
- Hover effect (subtle background)
- Upload icon (lucide-react)
- Text hidden on mobile

#### Success Indicator
- Green background (`bg-success/10`)
- Green border (`border-success/20`)
- CheckCircle icon (green)
- Record count text (green)
- Rounded corners (8px)

#### Clear Button
- Ghost variant
- Icon-only (X)
- Small size (32x32px)
- Hover effect

---

## 🔄 Integration with Dashboard

### Before (Local State)
```typescript
// Dashboard had its own upload state
const [uploadedDataset, setUploadedDataset] = useState<UploadedDataset | null>(null);
```

### After (Global State)
```typescript
// Dashboard uses global context
const { uploadedDataset, setUploadedDataset } = useDataset();
```

### Benefits
1. **Consistency**: Same dataset across all pages
2. **Convenience**: Upload once, use everywhere
3. **Visibility**: Always see upload status
4. **Simplicity**: Single source of truth

---

## 📝 CSV Format Support

### Required Columns
- `date` - Date in various formats (YYYY-MM-DD, DD/MM/YYYY, etc.)
- `price` - Numeric price value

### Optional Columns
- `rainfall` or `rain` - Rainfall data
- `arrivals` or `supply` - Supply/arrivals data
- `temperature` or `temp` - Temperature data

### Example CSV
```csv
date,price,rainfall,arrivals,temperature
2024-01-01,28500,45.2,2100,29.5
2024-01-02,28750,38.1,2250,30.1
2024-01-03,29100,42.5,2180,29.8
```

### Parsing Features
- Flexible column name matching
- Case-insensitive headers
- Multiple date format support
- Automatic data type conversion
- Error handling for invalid data

---

## 🎯 Use Cases

### 1. Market Research
**Scenario**: Researcher has historical price data from multiple markets

**Workflow**:
1. Navigate to any page
2. Click "Upload Dataset" in header
3. Select CSV file with market data
4. View predictions across all pages
5. Compare with AI insights
6. Analyze in Advanced Charts

### 2. Real-time Analysis
**Scenario**: Trader receives daily price updates

**Workflow**:
1. Upload today's data from header
2. Dashboard updates immediately
3. Check AI predictions
4. Make trading decisions
5. Clear dataset at end of day

### 3. Regional Comparison
**Scenario**: Farmer wants to compare different regions

**Workflow**:
1. Upload Region A data
2. View predictions and insights
3. Clear dataset
4. Upload Region B data
5. Compare results

### 4. Historical Study
**Scenario**: Student analyzing price trends over years

**Workflow**:
1. Upload historical dataset
2. Select different years/months
3. View trends in charts
4. Ask AI Assistant questions
5. Export findings

---

## 🔧 Technical Implementation

### App.tsx Integration
```typescript
<ThemeProvider>
  <DatasetProvider>  {/* Global dataset state */}
    <Toaster />
    <Router>
      <Header />  {/* Contains DatasetUpload */}
      <Routes>...</Routes>
    </Router>
  </DatasetProvider>
</ThemeProvider>
```

### Header.tsx Integration
```typescript
<div className="flex items-center gap-2 pl-2 border-l border-border/50">
  <DatasetUpload />  {/* New component */}
  <ThemeToggle />
</div>
```

### Dashboard.tsx Integration
```typescript
// Use global context instead of local state
const { uploadedDataset, setUploadedDataset } = useDataset();

// Data automatically updates when header upload changes
const chartData = useMemo(() => {
  if (uploadedDataset) {
    return uploadedDataset.data;
  }
  return generateDataForYearMonth(selectedYear, selectedMonth);
}, [selectedYear, selectedMonth, uploadedDataset]);
```

---

## ✅ Validation & Error Handling

### File Validation
- ✅ Check file extension (.csv only)
- ✅ Verify file can be read
- ✅ Validate CSV structure
- ✅ Check for required columns
- ✅ Ensure data is not empty

### Error Messages
```typescript
// Invalid file type
"Invalid File - Please upload a CSV file"

// Empty dataset
"Empty Dataset - The CSV file contains no valid data"

// Parse error
"Upload Failed - Failed to parse CSV file"

// Read error
"Upload Failed - Failed to read the file"
```

### Success Messages
```typescript
// Upload success
"Dataset Uploaded - Successfully loaded 31 records"

// Clear success
"Dataset Cleared - Using default generated data"
```

---

## 📱 Responsive Behavior

### Desktop (≥1280px)
- Full button with icon and text
- Separator line before upload section
- Adequate spacing between elements
- Hover effects enabled

### Tablet (768px - 1279px)
- Icon with abbreviated text
- Compact spacing
- Touch-friendly targets

### Mobile (<768px)
- Icon only (no text)
- Minimal spacing
- Large touch targets (44x44px minimum)
- No hover effects

---

## 🎨 Visual States

### 1. Default (No Upload)
```
┌─────────────────────┐
│ 📤 Upload Dataset   │
└─────────────────────┘
```

### 2. Uploading (Processing)
```
┌─────────────────────┐
│ ⏳ Processing...    │
└─────────────────────┘
```

### 3. Uploaded (Success)
```
┌──────────────┬───┐
│ ✓ 31 records │ X │
└──────────────┴───┘
```

### 4. Error State
```
┌─────────────────────┐
│ ⚠️ Upload Failed    │
└─────────────────────┘
```

---

## 🚀 Performance Considerations

### Optimizations
- File reading is asynchronous (non-blocking)
- CSV parsing happens in memory
- Context updates trigger minimal re-renders
- Memoized data calculations
- Efficient state management

### Limitations
- File size: Recommended < 5MB
- Records: Optimal < 10,000 rows
- Browser memory dependent
- No server-side processing

### Best Practices
- Use compressed CSV files
- Remove unnecessary columns
- Clean data before upload
- Test with sample data first

---

## 🧪 Testing Checklist

### Functionality
- ✅ Upload button opens file picker
- ✅ Only CSV files accepted
- ✅ Valid CSV parses correctly
- ✅ Invalid CSV shows error
- ✅ Empty file shows error
- ✅ Success toast displays
- ✅ Record count shows correctly
- ✅ Clear button removes dataset
- ✅ Clear toast displays
- ✅ Dashboard uses uploaded data
- ✅ Data persists across pages

### UI/UX
- ✅ Button visible on all pages
- ✅ Responsive on all screen sizes
- ✅ Icons display correctly
- ✅ Colors match theme
- ✅ Hover effects work
- ✅ Touch targets adequate
- ✅ Animations smooth

### Edge Cases
- ✅ Large files (>1MB)
- ✅ Malformed CSV
- ✅ Missing columns
- ✅ Empty rows
- ✅ Special characters
- ✅ Different date formats
- ✅ Multiple uploads
- ✅ Upload then clear then upload

---

## 💡 User Guide

### How to Upload a Dataset

#### Step 1: Prepare Your CSV
- Ensure file has `date` and `price` columns
- Optional: Add `rainfall`, `arrivals`, `temperature`
- Save as `.csv` format
- Keep file size reasonable (<5MB)

#### Step 2: Upload
1. Look for "Upload Dataset" button in header (top-right)
2. Click the button
3. Select your CSV file
4. Wait for success message

#### Step 3: Verify
- Check green indicator shows record count
- Navigate to Dashboard
- Verify charts show your data
- Check AI Insights for analysis

#### Step 4: Clear (Optional)
1. Click the X button next to record count
2. Confirm dataset is cleared
3. Platform reverts to default data

---

## 🔮 Future Enhancements

### Potential Features
- [ ] Drag-and-drop file upload
- [ ] Multiple dataset management
- [ ] Dataset history/versions
- [ ] Export modified data
- [ ] Data validation preview
- [ ] Column mapping interface
- [ ] Auto-detect date formats
- [ ] Support for Excel files
- [ ] Cloud storage integration
- [ ] Shareable dataset links

---

## 📊 Benefits Summary

### For Users
✅ **Convenience**: Upload from anywhere
✅ **Consistency**: Same data across all pages
✅ **Visibility**: Always see upload status
✅ **Flexibility**: Easy to switch datasets
✅ **Speed**: Quick upload process

### For Platform
✅ **Scalability**: Global state management
✅ **Maintainability**: Single upload component
✅ **Reusability**: Context used by all pages
✅ **Performance**: Efficient data sharing
✅ **UX**: Improved user experience

---

## 🎉 Summary

**Implementation Status**: ✅ **COMPLETE**

**New Components**:
- ✅ DatasetContext (global state)
- ✅ DatasetUpload (header component)
- ✅ Updated Header (integration)
- ✅ Updated Dashboard (context usage)
- ✅ Updated App (provider setup)

**Features**:
- ✅ Global dataset upload
- ✅ Header integration
- ✅ Real-time feedback
- ✅ Cross-page persistence
- ✅ Responsive design
- ✅ Error handling
- ✅ Success indicators

**User Experience**:
- Upload from any page
- See status in header
- Use data everywhere
- Clear anytime
- Instant feedback

**Technical Quality**:
- Clean architecture
- Type-safe implementation
- Efficient state management
- Comprehensive error handling
- Production-ready code

---

**The AgriAI platform now offers seamless, global dataset management! 📊🚀**
