import StatsCards from '../components/StatsCards'
import Charts from '../components/Charts'
import RecentHistory from '../components/RecentHistory'

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">📊 Dashboard Overview</h1>
      <StatsCards />
      <Charts />
      <RecentHistory />
    </div>
  )
}

export default Dashboard;