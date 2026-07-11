import { zodResolver as baseZodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import type { z } from "zod";

export function zodResolver<TSchema extends z.ZodType>(
  schema: TSchema,
): Resolver<z.infer<TSchema>> {
  return baseZodResolver(schema as never) as unknown as Resolver<
    z.infer<TSchema>
  >;
}
