import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as api from '../services/api';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [details, setDetails] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(true);

  const fetchIncidents = async () => {
    try {
      const { data } = await api.getMyIncidents();
      setIncidents(data);
    } catch (error) {
      toast.error('Could not fetch incidents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createIncident({ details, priority });
      toast.success('Incident created successfully!');
      setDetails('');
      setPriority('Medium');
      fetchIncidents(); // Refresh list after creation
    } catch (error) {
      toast.error('Failed to create incident');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Incident Dashboard</h1>

      {/* Create Incident Form */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Report a New Incident</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="details" className="block text-gray-700 font-bold mb-2">Incident Details</label>
            <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" required></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-gray-700 font-bold mb-2">Priority</label>
            <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300">
            Submit Incident
          </button>
        </form>
      </div>

      {/* Incident List */}
      <h2 className="text-2xl font-semibold mb-4">Reported Incidents</h2>
      <div className="space-y-4">
        {loading ? (
          <p>Loading incidents...</p>
        ) : incidents.length > 0 ? (
          incidents.map((incident) => (
            <div key={incident._id} className="p-4 bg-white rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <p className="font-bold text-lg text-gray-700">{incident.incidentId}</p>
                <p className="text-gray-600">{incident.details.substring(0, 100)}...</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className={`px-2 py-1 rounded-full text-white ${
                    incident.status === 'Open' ? 'bg-green-500' : 
                    incident.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}>{incident.status}</span>
                  <span className={`font-semibold ${
                    incident.priority === 'High' ? 'text-red-600' :
                    incident.priority === 'Medium' ? 'text-orange-500' : 'text-blue-500'
                  }`}>Priority: {incident.priority}</span>
                </div>
              </div>
              <Link to={`/edit/${incident._id}`} className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300 font-semibold text-gray-700 transition duration-300">
                View / Edit
              </Link>
            </div>
          ))
        ) : (
          <div className="p-4 bg-white rounded-lg shadow-sm text-center text-gray-500">
              <p>You have not reported any incidents yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;