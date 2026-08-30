# CRM Database Architecture

## Overview

The CRM uses PostgreSQL (via Supabase) as the central source of truth. All data persists in the database and is synchronized across connected devices via Supabase's realtime capabilities.

## Database Schema

### Core Tables

#### 1. `profiles` - User Profiles
Stores user information linked to Supabase Auth.

```
Column          | Type      | Constraints
────────────────┼───────────┼──────────────────────
id              | UUID      | PRIMARY KEY (from auth.users)
full_name       | text      | 
email           | text      | 
avatar_url      | text      | 
role            | text      | DEFAULT 'User'
created_at      | timestamp | DEFAULT now()
updated_at      | timestamp | DEFAULT now()
```

#### 2. `leads` - Sales Leads (Core Table)
Main table storing all lead information.

```
Column          | Type      | Constraints
────────────────┼───────────┼──────────────────────
id              | UUID      | PRIMARY KEY
company_name    | text      | NOT NULL
contact_person  | text      | 
phone           | text      | 
whatsapp        | text      | 
email           | text      | 
lead_type       | text      | (General Inquiry, Product Quote, Support, Partnership)
location        | text      | 
source          | text      | (Direct, Referral, Website, Social Media, Event)
priority        | enum      | (Cold, Warm, Hot) DEFAULT 'Warm'
status          | enum      | (New, Contacted, Interested, Meeting, Quotation, Negotiation, Won, Lost) DEFAULT 'New'
notes           | text      | 
created_by      | UUID      | FOREIGN KEY (profiles.id)
created_at      | timestamp | DEFAULT now()
updated_at      | timestamp | DEFAULT now()
```

**Indexes**: 
- `status` (for filtering pipeline)
- `created_at` (for sorting)
- `created_by` (for user filtering)

#### 3. `lead_activities` - Activity History
Immutable log of all interactions with a lead.

```
Column          | Type      | Constraints
────────────────┼───────────┼──────────────────────
id              | UUID      | PRIMARY KEY
lead_id         | UUID      | FOREIGN KEY (leads.id) NOT NULL, CASCADE DELETE
activity_type   | enum      | (Call, WhatsApp, Meeting, Email, Quotation, Note, Follow-up, Other)
description     | text      | NOT NULL
activity_date   | timestamp | NOT NULL
created_by      | UUID      | FOREIGN KEY (profiles.id)
created_at      | timestamp | DEFAULT now()
```

**Indexes**:
- `lead_id` (for retrieving activity history)
- `activity_date` (for chronological sorting)

#### 4. `follow_ups` - Scheduled Follow-ups
Tracks next actions and follow-up dates for leads.

```
Column          | Type      | Constraints
────────────────┼───────────┼──────────────────────
id              | UUID      | PRIMARY KEY
lead_id         | UUID      | FOREIGN KEY (leads.id) NOT NULL, CASCADE DELETE
action          | text      | NOT NULL (e.g., "Call Client")
scheduled_at    | timestamp | NOT NULL
completed_at    | timestamp | NULLABLE
status          | enum      | (Pending, Completed, Overdue) DEFAULT 'Pending'
created_by      | UUID      | FOREIGN KEY (profiles.id)
created_at      | timestamp | DEFAULT now()
updated_at      | timestamp | DEFAULT now()
```

**Indexes**:
- `lead_id` (for filtering by lead)
- `scheduled_at` (for date-based queries)
- `status` (for filter by Pending/Overdue/Completed)

#### 5. `attachments` - File Storage
References to files stored in Supabase Storage.

```
Column          | Type      | Constraints
────────────────┼───────────┼──────────────────────
id              | UUID      | PRIMARY KEY
lead_id         | UUID      | FOREIGN KEY (leads.id) NOT NULL, CASCADE DELETE
file_name       | text      | NOT NULL
file_path       | text      | NOT NULL (Supabase Storage path)
file_type       | text      | (pdf, doc, docx, xls, xlsx, jpg, png, etc.)
file_size       | bigint    | (in bytes)
uploaded_by     | UUID      | FOREIGN KEY (profiles.id)
created_at      | timestamp | DEFAULT now()
```

---

## Data Relationships

```
profiles (User)
    ├── has many leads (created_by)
    ├── has many lead_activities (created_by)
    ├── has many follow_ups (created_by)
    └── has many attachments (uploaded_by)

leads (Sales Lead)
    ├── has one creator (profiles via created_by)
    ├── has many lead_activities (CASCADE DELETE)
    ├── has many follow_ups (CASCADE DELETE)
    ├── has many attachments (CASCADE DELETE)
    └── updates profile (email, phone match possible existing user)
```

---

## Key Business Logic

### Lead Status Flow
```
New
  ↓
Contacted (after first interaction)
  ↓
Interested (client shows interest)
  ↓
Meeting (meeting scheduled/completed)
  ↓
Quotation (quote sent)
  ↓
Negotiation (terms being discussed)
  ↓
Won or Lost (final status)
```

### Priority Levels
- **Cold**: Not yet contacted or low interest
- **Warm**: Moderate interest, in active conversation
- **Hot**: High interest, close to closing

### Follow-up Status Logic
- **Pending**: `scheduled_at > now()` or `scheduled_at <= now() AND completed_at IS NULL`
- **Overdue**: `scheduled_at < now() AND completed_at IS NULL`
- **Completed**: `completed_at IS NOT NULL`

### Activity Types
- **Call**: Phone conversation
- **WhatsApp**: WhatsApp message/call
- **Meeting**: In-person or video meeting
- **Email**: Email communication
- **Quotation**: Quote created/sent
- **Note**: Internal note
- **Follow-up**: Reminder set
- **Other**: Misc

---

## Row Level Security (RLS)

### Policy: Users can only see their own data

#### For `leads` table
```sql
-- Users can select their own leads
CREATE POLICY "Users can view own leads"
  ON leads
  FOR SELECT
  USING (created_by = auth.uid());

-- Users can create leads
CREATE POLICY "Users can create leads"
  ON leads
  FOR INSERT
  WITH CHECK (created_by = auth.uid());

-- Users can update own leads
CREATE POLICY "Users can update own leads"
  ON leads
  FOR UPDATE
  USING (created_by = auth.uid());
```

#### For `lead_activities` table
```sql
-- Users can view activities for their leads
CREATE POLICY "Users can view activities for own leads"
  ON lead_activities
  FOR SELECT
  USING (
    lead_id IN (
      SELECT id FROM leads WHERE created_by = auth.uid()
    )
  );
```

Similar policies apply to `follow_ups` and `attachments`.

---

## Indexes for Performance

```sql
-- Leads indexes
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_by ON leads(created_by);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_priority ON leads(priority);

-- Activities indexes
CREATE INDEX idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX idx_lead_activities_activity_date ON lead_activities(activity_date DESC);

-- Follow-ups indexes
CREATE INDEX idx_follow_ups_lead_id ON follow_ups(lead_id);
CREATE INDEX idx_follow_ups_status ON follow_ups(status);
CREATE INDEX idx_follow_ups_scheduled_at ON follow_ups(scheduled_at);

-- Attachments indexes
CREATE INDEX idx_attachments_lead_id ON attachments(lead_id);
```

---

## Migration Strategy

### Phase 1: Create Core Tables
1. Create `profiles` table
2. Create `leads` table
3. Create `lead_activities` table
4. Create `follow_ups` table
5. Create `attachments` table
6. Add all indexes

### Phase 2: Enable RLS
1. Enable RLS on all tables
2. Create read/write policies
3. Test permissions

### Phase 3: Supabase Functions (Future)
- Auto-update lead status based on activity
- Calculate follow-up overdue status
- Aggregate statistics for reports

---

## Frontend Integration

### Type Definitions (TypeScript)
All types are defined in `src/lib/supabase.ts` for full type safety.

### Supabase Client
```typescript
import { supabase } from '@/lib/supabase';

// Example: Create a lead
const { data, error } = await supabase
  .from('leads')
  .insert({ company_name, contact_person, ... });
```

### Realtime Subscriptions
```typescript
// Listen for new leads
supabase
  .channel('leads')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, callback)
  .subscribe();
```

---

## Backup & Recovery

- **Automatic**: Supabase provides automatic daily backups
- **Manual**: Export data via Supabase dashboard
- **Point-in-time recovery**: Available within retention period

---

## Scalability Considerations

- ✅ Indexes optimize queries for large datasets
- ✅ Foreign keys ensure referential integrity
- ✅ CASCADE DELETE prevents orphaned records
- ✅ Supabase auto-scales PostgreSQL
- ⚠️ Consider partitioning `lead_activities` by date if millions of records

---

**Last Updated**: 2026-08-30
