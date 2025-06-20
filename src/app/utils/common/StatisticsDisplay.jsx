const StatisticsDisplay = ({ data }) => {
  const stats = [
    { label: 'Users', value: data.usersCount, color: 'bg-blue-500' },
    { label: 'Workers', value: data.workersCount, color: 'bg-green-500' },
    { label: 'Services', value: data.servicesCount, color: 'bg-cyan-500' },
    { label: 'Saloons', value: data.saloonsCount, color: 'bg-yellow-500' },
  ];

  return (
    <div className="p-6 text-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-52">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`transform transition p-9 w-[10rem] duration-500 hover:scale-105 ${stat.color} text-white rounded-lg shadow-lg p-6 animate-fadeIn`}
          >
            <div className="text-4xl font-extrabold">{stat.value}</div>
            <div className="text-lg font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsDisplay;