import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingCardProps {
  className?: string;
  showHeader?: boolean;
  linesCount?: number;
}

export function LoadingCard({ className, showHeader = true, linesCount = 3 }: LoadingCardProps) {
  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {Array.from({ length: linesCount }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" style={{ width: `${Math.random() * 40 + 60}%` }} />
        ))}
      </CardContent>
    </Card>
  );
}

export function LoadingCalculatorResult() {
  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className="border-emerald-200 bg-emerald-50">
        <CardHeader className="text-center">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-12 w-32 mx-auto mt-2" />
          <Skeleton className="h-5 w-40 mx-auto" />
        </CardHeader>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center">
              <Skeleton className="h-8 w-20 mx-auto mb-2" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Card */}
      <LoadingCard linesCount={8} />
    </div>
  );
}

export function LoadingCalculatorHistory() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="text-right space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}