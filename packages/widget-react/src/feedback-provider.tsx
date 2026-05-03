import { useEffect, useMemo, useState } from "react";
import {
  FasterFixesClient,
  resolveReviewerToken,
} from "@fasterfixes/core";
import type {
  Labels,
  WidgetConfig,
  WidgetPosition,
} from "@fasterfixes/core";
import type { ClassNames } from "./context.js";
import { FeedbackProviderCore } from "./feedback-provider-core.js";

type FeedbackProviderProps = {
  apiKey: string;
  apiOrigin?: string;
  color?: string;
  position?: WidgetPosition;
  classNames?: Partial<ClassNames>;
  labels?: Partial<Labels>;
  children: React.ReactNode;
};

export function FeedbackProvider({
  apiKey,
  apiOrigin,
  color,
  position,
  classNames,
  labels,
  children,
}: FeedbackProviderProps) {
  const [reviewerToken, setReviewerToken] = useState<string | null>(null);
  const [config, setConfig] = useState<WidgetConfig | null>(null);
  const [initialized, setInitialized] = useState(false);

  const client = useMemo(
    () => new FasterFixesClient({ apiKey, apiOrigin }),
    [apiKey, apiOrigin],
  );

  useEffect(() => {
    const token = resolveReviewerToken();
    if (!token) {
      setInitialized(true);
      return;
    }
    setReviewerToken(token);

    async function init() {
      try {
        const cfg = await client.getConfig();
        setConfig(cfg);
      } catch {
        // Config fetch failed — widget won't render
      }
      setInitialized(true);
    }

    void init();
  }, [client]);

  if (!initialized || !reviewerToken || !config || !config.enabled) {
    return <>{children}</>;
  }

  return (
    <FeedbackProviderCore
      client={client}
      reviewerToken={reviewerToken}
      config={config}
      color={color}
      position={position}
      classNames={classNames}
      labels={labels}
    >
      {children}
    </FeedbackProviderCore>
  );
}
