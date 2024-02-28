'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { type Enums } from '@/lib/database.types';
import { type AbilityDataType, type StrategyDataType } from '@/lib/queries/server';
import { usePixelPerFrame } from '@/lib/utils';
import { use, useEffect, useState } from 'react';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import { DamageEvaluation } from './DamageEvaluation';
import { EditColumn } from './EditColumn';
import { HeadColumn } from './HeadColumn';
import { createClient } from '@/lib/supabase/client';
import {
  type AbilityFallbackDataType,
  useAbilityDataQuery,
  type StrategyFallbackDataType,
  useStrategyDataQuery,
} from '@/lib/queries/client';
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-swr';

const jobs: Array<Enums<'job'>> = ['WAR', 'PLD', 'SAM', 'MNK', 'BRD', 'RDM', 'AST', 'SGE'];

export type CoreAreaProps = {
  strategyData: StrategyDataType;
  abilityData: AbilityDataType;
  strategyFallbackData: StrategyFallbackDataType;
  stratId: string;
};

export const CoreArea = (props: CoreAreaProps) => {
  const [resizePanelSize, setResizePanelSize] = useState(20);
  const pixelPerFrame = usePixelPerFrame();

  const raidDuration = props.strategyData.raids?.duration ?? 0;

  const supabase = createClient();

  const { data: strategyClientData, error: strategyError } = useStrategyDataQuery(
    supabase,
    props.stratId,
    props.strategyFallbackData,
  );

  useEffect(() => {
    console.log(strategyClientData);
  }, [strategyClientData]);

  return (
    <ScrollSync>
      <ResizablePanelGroup
        direction="horizontal"
        className="relative flex w-screen flex-grow overflow-hidden"
      >
        <ResizablePanel defaultSize={20} minSize={4} className="border-r">
          <div className="min-h-20 h-20 border-b"></div>
        </ResizablePanel>
        <ResizableHandle className="w-0" withHandle />
        <ResizablePanel
          defaultSize={80}
          maxSize={96}
          className="flex flex-col overflow-auto border-r bg-white"
          onResize={async (size) => {
            setResizePanelSize(size);
          }}
        >
          <ScrollSyncPane group="x">
            <div className="min-h-20 h-20 overflow-x-scroll overflow-y-clip overscroll-none scrollbar-hide border-b flex flex-row">
              {props.strategyData.strategy_players.map((playerStrategy) => (
                <HeadColumn
                  job={playerStrategy.job}
                  abilities={props.abilityData.filter(({ job }) => job === playerStrategy.job)}
                  key={`column-${playerStrategy.id}`}
                />
              ))}
            </div>
          </ScrollSyncPane>
          <ScrollSyncPane group={['x', 'y']}>
            <div className="flex flex-grow relative overflow-scroll overscroll-none">
              {props.strategyData.strategy_players.map((playerStrategy) => (
                <EditColumn
                  raidDuration={raidDuration}
                  playerStrategy={playerStrategy}
                  abilities={props.abilityData.filter(({ job }) => job === playerStrategy.job)}
                  key={`column-${playerStrategy.id}`}
                />
              ))}
            </div>
          </ScrollSyncPane>
        </ResizablePanel>
        <ScrollSyncPane group="y">
          <div className="absolute top-20 left-0 w-screen h-full pointer-events-none overflow-y-scroll scrollbar-hide">
            <div
              className="absolute top-0 left-0 w-screen"
              style={{ height: `${(raidDuration + 420) * pixelPerFrame}px` }}
            >
              {(strategyClientData ?? props.strategyData).raids?.gimmicks.map((value, index) => {
                return (
                  <DamageEvaluation {...value} resizePanelSize={resizePanelSize} key={index} />
                );
              })}
            </div>
          </div>
        </ScrollSyncPane>
      </ResizablePanelGroup>
    </ScrollSync>
  );
};
