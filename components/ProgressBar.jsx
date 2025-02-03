export default function ProgressBar({ gameState }) {
  const progressRatio = Math.min((gameState.stirCount / 10) * 100, 100);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-48 h-4 bg-gray-300 rounded-full">
      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progressRatio}%` }} />
    </div>
  );
}
