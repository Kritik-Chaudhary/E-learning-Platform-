
export default function ProgressBar({ percent = 0 }) {
  const fillStyle = { width: `${percent}%`, background: 'linear-gradient(90deg,#06b6d4,#3b82f6)' }
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 text-sm">
        <div className="text-gray-600">Progress</div>
        <div className="text-gray-600">{percent}%</div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={fillStyle} />
      </div>
    </div>
  )
}
