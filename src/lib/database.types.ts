export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      actions: {
        Row: {
          available_level: number;
          cooldown: number;
          deleted_subversion: number | null;
          deleted_version: number | null;
          icon_filename: string | null;
          id: string;
          is_gcd: boolean;
          job: Database['public']['Enums']['job'];
          name: string;
          priority: number;
          stacks: number;
          superseding_level: number | null;
          updated_subversion: number;
          updated_version: number;
        };
        Insert: {
          available_level: number;
          cooldown: number;
          deleted_subversion?: number | null;
          deleted_version?: number | null;
          icon_filename?: string | null;
          id?: string;
          is_gcd: boolean;
          job?: Database['public']['Enums']['job'];
          name?: string;
          priority: number;
          stacks?: number;
          superseding_level?: number | null;
          updated_subversion: number;
          updated_version: number;
        };
        Update: {
          available_level?: number;
          cooldown?: number;
          deleted_subversion?: number | null;
          deleted_version?: number | null;
          icon_filename?: string | null;
          id?: string;
          is_gcd?: boolean;
          job?: Database['public']['Enums']['job'];
          name?: string;
          priority?: number;
          stacks?: number;
          superseding_level?: number | null;
          updated_subversion?: number;
          updated_version?: number;
        };
        Relationships: [];
      };
      damages: {
        Row: {
          combined_damage: number;
          gimmick: string;
          id: string;
          max_shared: number;
          num_targets: number;
          target: Database['public']['Enums']['damage_target'];
          type: Database['public']['Enums']['damage_type'];
        };
        Insert: {
          combined_damage: number;
          gimmick: string;
          id?: string;
          max_shared: number;
          num_targets: number;
          target?: Database['public']['Enums']['damage_target'];
          type?: Database['public']['Enums']['damage_type'];
        };
        Update: {
          combined_damage?: number;
          gimmick?: string;
          id?: string;
          max_shared?: number;
          num_targets?: number;
          target?: Database['public']['Enums']['damage_target'];
          type?: Database['public']['Enums']['damage_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'public_damages_gimmick_fkey';
            columns: ['gimmick'];
            isOneToOne: false;
            referencedRelation: 'gimmicks';
            referencedColumns: ['id'];
          },
        ];
      };
      gimmicks: {
        Row: {
          cast_at: number | null;
          id: string;
          name: string;
          prepare_at: number;
          raid: string;
          resolve_at: number | null;
          type: Database['public']['Enums']['gimmick_type'];
        };
        Insert: {
          cast_at?: number | null;
          id?: string;
          name?: string;
          prepare_at: number;
          raid: string;
          resolve_at?: number | null;
          type?: Database['public']['Enums']['gimmick_type'];
        };
        Update: {
          cast_at?: number | null;
          id?: string;
          name?: string;
          prepare_at?: number;
          raid?: string;
          resolve_at?: number | null;
          type?: Database['public']['Enums']['gimmick_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'public_mechanic_raid_fkey';
            columns: ['raid'];
            isOneToOne: false;
            referencedRelation: 'raids';
            referencedColumns: ['id'];
          },
        ];
      };
      mitigations: {
        Row: {
          _mitigation_id: number;
          action: string;
          duration: number;
          is_raidwide: boolean;
          potency: number | null;
          rate: number | null;
          type: Database['public']['Enums']['mitigation_type'];
        };
        Insert: {
          _mitigation_id?: number;
          action: string;
          duration: number;
          is_raidwide?: boolean;
          potency?: number | null;
          rate?: number | null;
          type?: Database['public']['Enums']['mitigation_type'];
        };
        Update: {
          _mitigation_id?: number;
          action?: string;
          duration?: number;
          is_raidwide?: boolean;
          potency?: number | null;
          rate?: number | null;
          type?: Database['public']['Enums']['mitigation_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'public_mitigations_ability_fkey';
            columns: ['action'];
            isOneToOne: false;
            referencedRelation: 'actions';
            referencedColumns: ['id'];
          },
        ];
      };
      raids: {
        Row: {
          category: Database['public']['Enums']['raid_category'];
          duration: number;
          headcount: number;
          id: string;
          item_level: number;
          level: number;
          name: string;
        };
        Insert: {
          category?: Database['public']['Enums']['raid_category'];
          duration: number;
          headcount: number;
          id?: string;
          item_level: number;
          level: number;
          name?: string;
        };
        Update: {
          category?: Database['public']['Enums']['raid_category'];
          duration?: number;
          headcount?: number;
          id?: string;
          item_level?: number;
          level?: number;
          name?: string;
        };
        Relationships: [];
      };
      strategies: {
        Row: {
          author: string;
          created_at: string;
          id: string;
          is_public: boolean;
          likes: number;
          modified_at: string;
          name: string;
          password: string;
          raid: string;
          subversion: number;
          version: number;
        };
        Insert: {
          author?: string;
          created_at?: string;
          id?: string;
          is_public?: boolean;
          likes?: number;
          modified_at?: string;
          name?: string;
          password: string;
          raid: string;
          subversion: number;
          version: number;
        };
        Update: {
          author?: string;
          created_at?: string;
          id?: string;
          is_public?: boolean;
          likes?: number;
          modified_at?: string;
          name?: string;
          password?: string;
          raid?: string;
          subversion?: number;
          version?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'public_strategies_author_fkey';
            columns: ['author'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_strategies_raid_fkey';
            columns: ['raid'];
            isOneToOne: false;
            referencedRelation: 'raids';
            referencedColumns: ['id'];
          },
        ];
      };
      strategy_damage_options: {
        Row: {
          damage: string;
          num_shared: number | null;
          primary_target: string | null;
          strategy: string;
        };
        Insert: {
          damage: string;
          num_shared?: number | null;
          primary_target?: string | null;
          strategy: string;
        };
        Update: {
          damage?: string;
          num_shared?: number | null;
          primary_target?: string | null;
          strategy?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_strategy_damage_options_damage_fkey';
            columns: ['damage'];
            isOneToOne: false;
            referencedRelation: 'damages';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_strategy_damage_options_primary_target_fkey';
            columns: ['primary_target'];
            isOneToOne: false;
            referencedRelation: 'strategy_players';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_strategy_gimmick_shared_strategy_fkey';
            columns: ['strategy'];
            isOneToOne: false;
            referencedRelation: 'strategies';
            referencedColumns: ['id'];
          },
        ];
      };
      strategy_player_entries: {
        Row: {
          action: string;
          id: string;
          player: string;
          use_at: number;
        };
        Insert: {
          action: string;
          id?: string;
          player: string;
          use_at: number;
        };
        Update: {
          action?: string;
          id?: string;
          player?: string;
          use_at?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'public_strategy_entries_mitigation_fkey';
            columns: ['action'];
            isOneToOne: false;
            referencedRelation: 'actions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_strategy_player_entries_player_fkey';
            columns: ['player'];
            isOneToOne: false;
            referencedRelation: 'strategy_players';
            referencedColumns: ['id'];
          },
        ];
      };
      strategy_players: {
        Row: {
          id: string;
          job: Database['public']['Enums']['job'];
          strategy: string;
        };
        Insert: {
          id?: string;
          job?: Database['public']['Enums']['job'];
          strategy: string;
        };
        Update: {
          id?: string;
          job?: Database['public']['Enums']['job'];
          strategy?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_strategy_players_strategy_fkey';
            columns: ['strategy'];
            isOneToOne: false;
            referencedRelation: 'strategies';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      damage_target: 'Raidwide' | 'Tankbuster';
      damage_type: 'Physical' | 'Magical' | 'Unique';
      gimmick_type: 'Raidwide' | 'Tankbuster' | 'AutoAttack' | 'Avoidable' | 'Hybrid' | 'Enrage';
      job:
        | 'PLD'
        | 'WAR'
        | 'DRK'
        | 'GNB'
        | 'WHM'
        | 'AST'
        | 'SCH'
        | 'SGE'
        | 'MNK'
        | 'DRG'
        | 'NIN'
        | 'SAM'
        | 'RPR'
        | 'BRD'
        | 'MCH'
        | 'DNC'
        | 'BLM'
        | 'RDM'
        | 'SMN'
        | 'BLU'
        | 'LB'
        | 'PCT'
        | 'VPR';
      mitigation_type: 'Physical' | 'Magical' | 'Barrier' | 'Invuln' | 'Support' | 'ActiveAmp' | 'PassiveAmp';
      raid_category: 'Savage' | 'Ultimate' | 'Trial' | 'Raid' | 'Dungeon';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
