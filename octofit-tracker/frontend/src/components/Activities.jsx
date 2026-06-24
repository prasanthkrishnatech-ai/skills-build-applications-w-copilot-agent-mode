import { useEffect, useMemo, useState } from 'react'

const getActivitiesApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities`
    : 'http://localhost:8000/api/activities'
}

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && payload.data && Array.isArray(payload.data)) return payload.data
  if (payload && payload.data && Array.isArray(payload.data.items)) return payload.data.items
  return []
}

function Activities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => getActivitiesApiUrl(), [])

  useEffect(() => {
    const controller = new AbortController()

    const loadActivities = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setItems(normalizeItems(payload))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load activities')
        }
      } finally {
        setLoading(false)
      }
    }

    void loadActivities()

    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="h4">Activities</h2>
      <p className="text-muted small">Source: {endpoint}</p>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity.type || '-'}</td>
                  <td>{activity.userId?.username || activity.user?.username || '-'}</td>
                  <td>{activity.durationMinutes ?? '-'}</td>
                  <td>{activity.caloriesBurned ?? '-'}</td>
                  <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <p className="mb-0">No activities found.</p>}
        </div>
      )}
    </section>
  )
}

export default Activities
