export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          annual_revenue: number | null
          company_name: string
          created_at: string | null
          credit_limit: number | null
          id: string
          industry: string | null
          profile_id: string
          registration_number: string | null
          updated_at: string | null
          verification_status:
            | Database["public"]["Enums"]["company_verification_status"]
            | null
        }
        Insert: {
          annual_revenue?: number | null
          company_name: string
          created_at?: string | null
          credit_limit?: number | null
          id?: string
          industry?: string | null
          profile_id: string
          registration_number?: string | null
          updated_at?: string | null
          verification_status?:
            | Database["public"]["Enums"]["company_verification_status"]
            | null
        }
        Update: {
          annual_revenue?: number | null
          company_name?: string
          created_at?: string | null
          credit_limit?: number | null
          id?: string
          industry?: string | null
          profile_id?: string
          registration_number?: string | null
          updated_at?: string | null
          verification_status?:
            | Database["public"]["Enums"]["company_verification_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      company_vendors: {
        Row: {
          company_id: string
          created_at: string | null
          credit_limit: number | null
          id: string
          relationship_type: string | null
          vendor_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          credit_limit?: number | null
          id?: string
          relationship_type?: string | null
          vendor_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          credit_limit?: number | null
          id?: string
          relationship_type?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_vendors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_vendors_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      disputes: {
        Row: {
          created_at: string | null
          description: string | null
          dispute_reason: string
          id: string
          loan_id: string
          raised_by_profile_id: string
          resolution: string | null
          resolved_at: string | null
          resolved_by_profile_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          dispute_reason: string
          id?: string
          loan_id: string
          raised_by_profile_id: string
          resolution?: string | null
          resolved_at?: string | null
          resolved_by_profile_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          dispute_reason?: string
          id?: string
          loan_id?: string
          raised_by_profile_id?: string
          resolution?: string | null
          resolved_at?: string | null
          resolved_by_profile_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disputes_loan_id_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_raised_by_profile_id_fkey"
            columns: ["raised_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_resolved_by_profile_id_fkey"
            columns: ["resolved_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      loans: {
        Row: {
          borrower_profile_id: string
          collateral_tokens: number | null
          created_at: string | null
          due_date: string | null
          id: string
          interest_rate: number
          lender_profile_id: string | null
          loan_amount: number
          repaid_amount: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["loan_status"] | null
          term_months: number
          updated_at: string | null
        }
        Insert: {
          borrower_profile_id: string
          collateral_tokens?: number | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          interest_rate: number
          lender_profile_id?: string | null
          loan_amount: number
          repaid_amount?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["loan_status"] | null
          term_months: number
          updated_at?: string | null
        }
        Update: {
          borrower_profile_id?: string
          collateral_tokens?: number | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          interest_rate?: number
          lender_profile_id?: string | null
          loan_amount?: number
          repaid_amount?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["loan_status"] | null
          term_months?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loans_borrower_profile_id_fkey"
            columns: ["borrower_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loans_lender_profile_id_fkey"
            columns: ["lender_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          organization_name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name: string
          organization_name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          organization_name?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      token_balances: {
        Row: {
          available_balance: number | null
          id: string
          locked_balance: number | null
          profile_id: string
          total_balance: number | null
          updated_at: string | null
        }
        Insert: {
          available_balance?: number | null
          id?: string
          locked_balance?: number | null
          profile_id: string
          total_balance?: number | null
          updated_at?: string | null
        }
        Update: {
          available_balance?: number | null
          id?: string
          locked_balance?: number | null
          profile_id?: string
          total_balance?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "token_balances_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      token_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          from_profile_id: string | null
          id: string
          metadata: Json | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          to_profile_id: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          from_profile_id?: string | null
          id?: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          to_profile_id?: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          from_profile_id?: string | null
          id?: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          to_profile_id?: string | null
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "token_transactions_from_profile_id_fkey"
            columns: ["from_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "token_transactions_to_profile_id_fkey"
            columns: ["to_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          parent_vendor_id: string | null
          profile_id: string
          status: Database["public"]["Enums"]["vendor_status"] | null
          updated_at: string | null
          vendor_name: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          parent_vendor_id?: string | null
          profile_id: string
          status?: Database["public"]["Enums"]["vendor_status"] | null
          updated_at?: string | null
          vendor_name: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          parent_vendor_id?: string | null
          profile_id?: string
          status?: Database["public"]["Enums"]["vendor_status"] | null
          updated_at?: string | null
          vendor_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendors_parent_vendor_id_fkey"
            columns: ["parent_vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_profile_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      update_token_balance: {
        Args: {
          p_profile_id: string
          p_amount_change: number
          p_balance_type?: string
        }
        Returns: boolean
      }
    }
    Enums: {
      company_verification_status: "pending" | "verified" | "rejected"
      loan_status:
        | "pending"
        | "approved"
        | "active"
        | "repaid"
        | "defaulted"
        | "disputed"
        | "completed"
      transaction_status: "pending" | "completed" | "failed"
      transaction_type:
        | "transfer"
        | "receive"
        | "mint"
        | "burn"
        | "redeem"
        | "loan_disbursement"
        | "loan_repayment"
      user_role: "bank" | "company" | "vendor"
      vendor_status: "active" | "inactive" | "pending" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      company_verification_status: ["pending", "verified", "rejected"],
      loan_status: [
        "pending",
        "approved",
        "active",
        "repaid",
        "defaulted",
        "disputed",
        "completed",
      ],
      transaction_status: ["pending", "completed", "failed"],
      transaction_type: [
        "transfer",
        "receive",
        "mint",
        "burn",
        "redeem",
        "loan_disbursement",
        "loan_repayment",
      ],
      user_role: ["bank", "company", "vendor"],
      vendor_status: ["active", "inactive", "pending", "suspended"],
    },
  },
} as const
