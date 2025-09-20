# Claude Code Build Instructions - Raisin Legal AI Command Center

## 🎯 Total Build Time: ~90 minutes

## Phase 1: Project Setup (10 minutes)

### 1.1 Initialize Project
```bash
# Navigate to project directory
cd C:\Users\kevin\Projects\raisin-proposal

# Create Next.js 14 app with TypeScript and Tailwind
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --use-npm --eslint

# If directory has conflicts, clean first:
rm -rf .claude
```

### 1.2 Install Dependencies
```bash
# Core dependencies
npm install framer-motion @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-tooltip

# Additional libraries
npm install recharts reactflow zustand react-hook-form react-world-flags react-markdown lucide-react clsx tailwind-merge
```

### 1.3 Create Folder Structure
```bash
# Create all required directories
mkdir -p src/app/{dashboard,compliance-radar,contract-intel,legal-assistant,quality-loop}
mkdir -p src/app/api/{analyze-contract,compliance-check,customer-query,feedback}
mkdir -p src/components/{ui,compliance,contracts,quality,shared}
mkdir -p src/lib src/styles
```

### 1.4 Set Up Theme
Create `src/styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: 99 102 241;
    --secondary: 16 185 129;
    --accent: 245 158 11;
    --background: 249 250 251;
    --foreground: 17 24 39;
  }
}

@layer components {
  .gradient-brand {
    @apply bg-gradient-to-br from-primary to-indigo-700;
  }
  .gradient-success {
    @apply bg-gradient-to-br from-secondary to-emerald-600;
  }
  .glass-effect {
    @apply bg-white/80 backdrop-blur-lg border border-gray-200;
  }
}
```

## Phase 2: Core Pages (30 minutes)

### 2.1 Landing Page (`src/app/page.tsx`)
Key components to build:
- **Hero Section**:
  - Large gradient headline
  - Stats grid (400+ banks, 10 markets, etc.)
  - Animated entrance with Framer Motion

- **Problem Statement Cards**:
  - 3 cards with icons (Shield, FileCheck, Zap)
  - Hover effects and staggered animations

- **ROI Calculator Component**:
  - Interactive sliders for document volume
  - Real-time calculation display
  - Gradient background for emphasis

### 2.2 Dashboard (`src/app/dashboard/page.tsx`)
Layout structure:
```tsx
<div className="grid lg:grid-cols-2 gap-8">
  {/* Left Panel - Compliance Map */}
  <ComplianceStatusMap />

  {/* Right Panel - Metrics & Activity */}
  <div>
    <MetricsGrid />
    <ActivityFeed />
  </div>
</div>
```

Features:
- **Metrics Cards**: Use `MetricsCard` component with trend indicators
- **Jurisdiction Map**: Clickable country buttons with risk colors
- **Activity Feed**: Mock real-time updates with `setInterval`

### 2.3 Mock Data Setup (`src/lib/mock-data.ts`)
Essential data structures:
```typescript
export const mockJurisdictions = [
  { code: 'DE', name: 'Germany', regulations: ['MiFID II', 'GDPR', 'BaFin'], risk: 'low' },
  // ... add all 10 markets
]

export const mockAlerts = [
  {
    id: 1,
    severity: 'high',
    title: 'EU AI Act Update',
    jurisdictions: ['DE', 'FR', 'ES'],
    impact: '127 partner banks affected'
  },
  // ... more alerts
]
```

## Phase 3: Key Features (40 minutes)

### 3.1 Compliance Radar (`src/app/compliance-radar/page.tsx`)

**Filter Panel** (Left side):
- Jurisdiction checkboxes with flags
- Severity level selector
- Framework multi-select

**Alert Feed** (Right side):
```tsx
{filteredAlerts.map(alert => (
  <AlertCard
    key={alert.id}
    severity={alert.severity}
    jurisdictions={alert.jurisdictions}
    onClick={() => setSelectedAlert(alert)}
  />
))}
```

**Impact Matrix**:
- 3 columns (High/Medium/Low)
- Color-coded counts
- Action timelines

### 3.2 Contract Intelligence (`src/app/contract-intel/page.tsx`)

**Three-Step Workflow**:

Step 1 - Upload:
```tsx
const handleDrop = (e: React.DragEvent) => {
  const file = e.dataTransfer.files[0]
  setUploadedFile(file)
  setActiveStep('analyze')
  simulateAnalysis()
}
```

Step 2 - Analysis:
- Loading animation with progress steps
- Simulated 3-second processing

Step 3 - Review:
- Split screen (original vs extracted)
- Risk flags with severity colors
- Action buttons (Approve/Flag/Escalate)

### 3.3 Quality Loop (`src/app/quality-loop/page.tsx`)

**Split View Implementation**:
```tsx
<div className="grid lg:grid-cols-2 gap-6">
  {/* AI Generated */}
  <div className="bg-white rounded-xl p-6">
    <ConfidenceIndicator score={item.confidence} />
    <ContentDisplay text={item.aiGenerated} />
  </div>

  {/* Human Edited */}
  <div className="bg-white rounded-xl p-6">
    <VerifiedBadge />
    <ContentDisplay text={item.humanEdited} />
    <DifferenceHighlight />
  </div>
</div>
```

**Feedback System**:
- Category dropdown
- Severity buttons (Low/Medium/High)
- Pattern detection indicator
- Action buttons with icons

### 3.4 Legal Assistant (`src/app/legal-assistant/page.tsx`)

**Query List** (Left panel):
- Filterable by category/status
- Confidence score display
- Click to generate response

**Response Generator** (Right panel):
```tsx
const handleGenerateResponse = async (query) => {
  setIsGenerating(true)

  // Simulate AI processing
  await delay(2000)

  const response = generateContextualResponse(query)
  setResponseMessage(response)
  setIsGenerating(false)
}
```

## Phase 4: Polish & Demo Flow (20 minutes)

### 4.1 Add Loading States
```tsx
// Skeleton component for loading
export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  )
}
```

### 4.2 Page Transitions
```tsx
// Wrap pages with motion.div
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {/* Page content */}
</motion.div>
```

### 4.3 Demo Mode Banner
Create `src/components/shared/DemoBanner.tsx`:
```tsx
export function DemoBanner() {
  return (
    <div className="bg-gradient-to-r from-primary to-indigo-700 text-white p-2 text-center">
      🎯 Demo Mode - Showcasing Raisin Legal AI Capabilities
    </div>
  )
}
```

### 4.4 Keyboard Shortcuts
```tsx
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
      switch(e.key) {
        case '1': router.push('/dashboard'); break;
        case '2': router.push('/compliance-radar'); break;
        case '3': router.push('/contract-intel'); break;
        // ... etc
      }
    }
  }
  window.addEventListener('keydown', handleKeyPress)
}, [])
```

### 4.5 Demo Data Story
Ensure mock data tells a coherent story:
1. Deutsche Bank contract with GDPR issue
2. EU AI Act alert affecting multiple banks
3. Customer query about KYC requirements
4. Quality loop showing improvement pattern

## Phase 5: Deployment Prep (10 minutes)

### 5.1 Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_DEMO_MODE=true
```

### 5.2 Production Build Test
```bash
npm run build
npm start
# Test at http://localhost:3000
```

### 5.3 Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, select:
# - Link to existing project: No
# - Project name: raisin-legal-ai
# - Directory: ./
# - Build settings: defaults
```

### 5.4 Demo Script
Create `DEMO_SCRIPT.md`:
```markdown
# Demo Flow (15 minutes)

1. **Landing (2 min)**
   - Show hero and value prop
   - Interact with ROI calculator
   - Click "Enter Demo"

2. **Dashboard (2 min)**
   - Point out real-time metrics
   - Click on Germany in map
   - Show activity feed updates

3. **Compliance Radar (3 min)**
   - Filter by high severity
   - Click on EU AI Act alert
   - Show auto-generated brief
   - Demonstrate export

4. **Contract Intelligence (3 min)**
   - Drag and drop contract
   - Show analysis process
   - Review risk flags
   - Click escalate for high-risk

5. **Legal Assistant (2 min)**
   - Select KYC query
   - Show AI response generation
   - Highlight confidence score
   - Send to customer

6. **Quality Loop (3 min)**
   - Review AI vs Human comparison
   - Add feedback
   - Show pattern detection
   - Approve with comments
```

## 🚀 Quick Commands Reference

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

## ⚡ Performance Optimization Tips

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Leverage dynamic imports for heavy components
3. **Memoization**: Use React.memo for expensive renders
4. **API Caching**: Implement SWR or React Query for data fetching
5. **Bundle Analysis**: Run `npm run build` and check `.next/analyze`

## 🎨 Design Consistency Checklist

- [ ] All buttons use consistent padding and hover states
- [ ] Cards have uniform shadows and borders
- [ ] Text sizes follow hierarchy (text-xs, text-sm, text-base, text-lg)
- [ ] Icons are consistently sized (w-4 h-4 for small, w-5 h-5 for medium)
- [ ] Spacing uses Tailwind scale (p-4, p-6, p-8)
- [ ] Colors match brand palette

## 📝 Final Notes

- Test all features in both light and dark mode (if implemented)
- Ensure mobile responsiveness for tablet viewing
- Add aria-labels for accessibility
- Include loading and error states for all async operations
- Document any API endpoints that would need real implementation

---

**Ready to impress Raisin with AI-powered legal operations! 🚀**