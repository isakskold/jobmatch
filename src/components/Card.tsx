interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white shadow rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({
  title,
  value,
  color = "blue",
}: {
  title: string;
  value: string | number;
  color?: "blue" | "green" | "purple";
}) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-900",
    green: "bg-green-50 text-green-900",
    purple: "bg-purple-50 text-purple-900",
  };

  const valueColorStyles = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
  };

  return (
    <div className={`${colorStyles[color]} p-6 rounded-lg`}>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className={`text-3xl font-bold mt-2 ${valueColorStyles[color]}`}>
        {value}
      </p>
    </div>
  );
}
