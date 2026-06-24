import { useEffect, useMemo, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'
}

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && payload.data && Array.isArray(payload.data)) return payload.data
  if (payload && payload.data && Array.isArray(payload.data.items)) return payload.data.items
  return []
}

function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => `${getApiBaseUrl()}/workouts/`, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadWorkouts = async () => {
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
          setError(err.message || 'Failed to load workouts')
        }
      } finally {
        setLoading(false)
      }
    }

    void loadWorkouts()

    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="h4">Workouts</h2>
      <p className="text-muted small">Source: {endpoint}</p>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Duration (min)</th>
                <th>Target Muscles</th>
              </tr>
            </thead>
            <tbody>
              {items.map((workout) => (
                <tr key={workout._id || workout.id || workout.title}>
                  <td>{workout.title || '-'}</td>
                  <td>{workout.difficulty || '-'}</td>
                  <td>{workout.durationMinutes ?? '-'}</td>
                  <td>{Array.isArray(workout.targetMuscles) ? workout.targetMuscles.join(', ') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <p className="mb-0">No workouts found.</p>}
        </div>
      )}
    </section>
  )
}

export default Workouts
