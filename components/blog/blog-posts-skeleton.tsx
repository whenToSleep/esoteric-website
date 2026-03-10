function CardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="animate-pulse overflow-hidden rounded-3xl border border-overlay/50 bg-onyx"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="aspect-video w-full bg-elevated" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-16 rounded-full bg-crimson-950" />
        <div className="h-5 w-4/5 rounded bg-elevated" />
        <div className="space-y-2">
          <div className="h-3.5 w-full rounded bg-elevated" />
          <div className="h-3.5 w-2/3 rounded bg-elevated" />
        </div>
        <div className="h-3.5 w-24 rounded bg-elevated" />
      </div>
    </div>
  );
}

export function BlogPostsSkeleton({ showFeatured = true }: { showFeatured?: boolean }) {
  return (
    <>
      {showFeatured && (
        <div className="mb-8 animate-pulse overflow-hidden rounded-3xl border border-overlay/50 bg-onyx">
          <div className="flex flex-col md:flex-row">
            <div className="aspect-video w-full bg-elevated md:aspect-auto md:min-h-[280px] md:w-1/2" />
            <div className="flex flex-1 flex-col justify-center gap-4 p-6 md:p-8">
              <div className="h-4 w-20 rounded-full bg-crimson-950" />
              <div className="h-7 w-3/4 rounded-lg bg-elevated" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-elevated" />
                <div className="h-4 w-5/6 rounded bg-elevated" />
              </div>
              <div className="h-4 w-32 rounded bg-elevated" />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: showFeatured ? 3 : 6 }).map((_, i) => (
          <CardSkeleton key={i} delay={i * 150} />
        ))}
      </div>
    </>
  );
}
