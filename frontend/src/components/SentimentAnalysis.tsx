'use client';

export default function SentimentAnalysis({ sentimentSummary }: { sentimentSummary: any }) {
  const percentPos = Math.round((sentimentSummary.positive / sentimentSummary.total) * 100) || 0;
  const percentNeu = Math.round((sentimentSummary.neutral / sentimentSummary.total) * 100) || 0;
  const percentNeg = Math.round((sentimentSummary.negative / sentimentSummary.total) * 100) || 0;

  return (
    <div className="bg-card-bg border border-border rounded-3xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-8 tracking-tight">Review Sentiment Analysis</h2>
      
      <div className="space-y-6">
        <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-200 dark:border-green-900/30 flex justify-between items-center">
            <p className="text-green-700 dark:text-green-400 font-bold text-lg">Positive Feedback</p>
            <div className="text-4xl font-black text-green-700 dark:text-green-400">
              {percentPos}%
            </div>
        </div>
        <div className="bg-gray-50 dark:bg-zinc-800/30 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 flex justify-between items-center">
            <p className="text-gray-700 dark:text-gray-400 font-bold text-lg">Mixed / Neutral</p>
            <div className="text-4xl font-black text-gray-700 dark:text-gray-400">
              {percentNeu}%
            </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-200 dark:border-red-900/30 flex justify-between items-center">
            <p className="text-red-700 dark:text-red-400 font-bold text-lg">Negative Issues</p>
            <div className="text-4xl font-black text-red-700 dark:text-red-400">
              {percentNeg}%
            </div>
        </div>
      </div>
      
      <p className="text-sm text-foreground/50 mt-6 text-center font-medium">Based on {sentimentSummary.total} aggregated reviews</p>
    </div>
  );
}
