import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';
import { publicProcedure, router, urqlClient } from '../trpc';
import { z } from 'zod';

export const gameRouter = router({
  getSwitchGameList: publicProcedure.query(async () => {
    return await prisma.dwd_switch_game_played_record.findMany();
  }),
});
