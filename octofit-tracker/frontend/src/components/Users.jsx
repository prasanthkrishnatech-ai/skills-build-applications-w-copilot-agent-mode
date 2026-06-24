import { useEffect, useMemo, useState } from 'react'

const getUsersApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users`
    : 'http://localhost:8000/api/users'
}

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && payload.data && Array.isArray(payload.data)) return payload.data
  if (payload && payload.data && Array.isArray(payload.data.items)) return payload.data.items
  return []
}

function Users() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const endpoint = useMemo(() => getUsersApiUrl(), [])

  useEffect(() => {
    const controller = new AbortController()

    const loadUsers = async () => {
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
          setError(err.message || 'Failed to load users')
        }
      } finally {
        setLoading(false)
      }
    }

    void loadUsers()

    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="h4">Users</h2>
      <p className="text-muted small">Source: {endpoint}</p>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Fitness Level</th>
                <th>Goals</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id || user.id || user.email}>
                  <td>{user.username || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>{user.fitnessLevel || '-'}</td>
                  <td>{Array.isArray(user.goals) ? user.goals.join(', ') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <p className="mb-0">No users found.</p>}
        </div>
      )}
    </section>
  )
}

export default Users
