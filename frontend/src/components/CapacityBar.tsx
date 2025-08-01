export default function CapacityBar({ allocated }: { allocated: number }) {
  return (
    <div className="w-40 bg-gray-200 rounded-full h-3">
      <div
        className={`h-3 rounded-full ${allocated > 80 ? "bg-red-500" : "bg-green-500"}`}
        style={{ width: `${allocated}%` }}
      />
    </div>
  );
}
