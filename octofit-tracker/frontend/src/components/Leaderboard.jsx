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

function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => `${getApiBaseUrl()}/leaderboard/`, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadLeaderboard = async () => {
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
          setError(err.message || 'Failed to load leaderboard')
        }
      } finally {
        setLoading(false)
      }
    }

    void loadLeaderboard()

    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="h4">Leaderboard</h2>
      <p className="text-muted small">Source: {endpoint}</p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Entry</th>
                <th>Type</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((entry) => (
                <tr key={entry._id || entry.id || `${entry.rank}-${entry.points}`}>
                  <td>{entry.rank ?? '-'}</td>
                  <td>{entry.userId?.username || entry.teamId?.name || '-'}</td>
                  <td>{entry.entryType || '-'}</td>
                  <td>{entry.points ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <p className="mb-0">No leaderboard entries found.</p>}
        </div>
      )}
    </section>
  )
}

export default Leaderboard
