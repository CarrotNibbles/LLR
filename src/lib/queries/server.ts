'use server';

import type { QueryData } from '@supabase/supabase-js';
import type { createClient } from '../supabase/server';
import type { SortOption, Version } from '../utils';

export const buildActionDataQuery = (supabase: ReturnType<typeof createClient>) => {
  return supabase.from('actions').select('*, mitigations(*)').order('priority');
};

export type ActionDataType = QueryData<ReturnType<typeof buildActionDataQuery>>;

export const buildStrategyCountQuery = async (
  supabase: ReturnType<typeof createClient>,
  params: { q?: string; raid?: string; version?: Version },
) => {
  const { q, raid, version } = params;

  let query = supabase
    .from('strategies')
    .select('*, raids!inner(semantic_key)', { count: 'exact', head: true })
    .eq('is_public', true);

  if (raid !== undefined) query = query.eq('raids.semantic_key', raid);
  if (version !== undefined) query = query.eq('version', version.version).eq('subversion', version.subversion);
  if (q !== undefined) query = query.ilike('name', `%${q}%`);

  const res = await query;
  return res;
};

export const buildStrategiesDataQuery = async (
  supabase: ReturnType<typeof createClient>,
  params: {
    q?: string;
    raid?: string;
    version?: Version;
    page: number;
    limit: number;
    sort: SortOption;
  },
) => {
  const { q, raid, version, page, limit, sort } = params;
  let query = supabase
    .from('strategies')
    .select(
      `id, name, version, subversion, modified_at, created_at,
      raids!inner(name, semantic_key),
      like_counts!inner(user_likes, anon_likes), 
      strategy_players!inner(id, job, order)`,
    )
    .eq('is_public', true);
  
  if (raid !== undefined) query = query.eq('raids.semantic_key', raid);
  if (version !== undefined) query = query.eq('version', version.version).eq('subversion', version.subversion);
  if (q !== undefined) query = query.ilike('name', `%${q}%`);

  const res = await query.order('created_at', { ascending: false }).range((page - 1) * limit, page * limit - 1);

  if (res.data) for (const strategy of res.data) strategy.strategy_players.sort((a, b) => a.order - b.order);

  return res;
};

export type BoardStrategiesDataType = QueryData<ReturnType<typeof buildStrategiesDataQuery>>;

export const buildStrategyDataQuery = async (supabase: ReturnType<typeof createClient>, strategyId: string) => {
  const res = await supabase
    .from('strategies')
    .select(
      `*,
      like_counts(*),
      user_likes(*),
      strategy_players(*, strategy_player_entries(*)),
      raids!inner(*, gimmicks(*, damages(*, strategy_damage_options(*))))`,
    )
    .eq('id', strategyId)
    .maybeSingle();

  if (res.data) res.data.strategy_players.sort((a, b) => a.order - b.order);

  return res;
};

export type StrategyDataType = QueryData<ReturnType<typeof buildStrategyDataQuery>>;

export const buildRaidsDataQuery = async (supabase: ReturnType<typeof createClient>) => supabase.from('raids').select();

export type RaidsDataType = QueryData<ReturnType<typeof buildRaidsDataQuery>>;
