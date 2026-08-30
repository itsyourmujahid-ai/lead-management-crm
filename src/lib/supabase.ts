import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          avatar_url: string | null;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      leads: {
        Row: {
          id: string;
          company_name: string;
          contact_person: string | null;
          phone: string | null;
          whatsapp: string | null;
          email: string | null;
          lead_type: string | null;
          location: string | null;
          source: string | null;
          priority: 'Cold' | 'Warm' | 'Hot';
          status: 'New' | 'Contacted' | 'Interested' | 'Meeting' | 'Quotation' | 'Negotiation' | 'Won' | 'Lost';
          notes: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['leads']['Insert']>;
      };
      lead_activities: {
        Row: {
          id: string;
          lead_id: string;
          activity_type: 'Call' | 'WhatsApp' | 'Meeting' | 'Email' | 'Quotation' | 'Note' | 'Follow-up' | 'Other';
          description: string;
          activity_date: string;
          created_by: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['lead_activities']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['lead_activities']['Insert']>;
      };
      follow_ups: {
        Row: {
          id: string;
          lead_id: string;
          action: string;
          scheduled_at: string;
          completed_at: string | null;
          status: 'Pending' | 'Completed' | 'Overdue';
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['follow_ups']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['follow_ups']['Insert']>;
      };
      attachments: {
        Row: {
          id: string;
          lead_id: string;
          file_name: string;
          file_path: string;
          file_type: string;
          file_size: number;
          uploaded_by: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['attachments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['attachments']['Insert']>;
      };
    };
  };
};
