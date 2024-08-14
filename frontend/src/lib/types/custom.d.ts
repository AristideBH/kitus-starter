import type { Collections, Types } from "./client";

export type CustomDirectusFile =
    | Partial<Types.Optional<Collections.DirectusFile>>
    | Types.Optional<string>