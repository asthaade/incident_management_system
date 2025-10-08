import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as api from '../services/api';

const EditIncident = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [formData, setFormData] = useState({ details: '', priority: '', status: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const { data } = await api.getIncidentDetails(id);
        setIncident(data);
        setFormData({
          details: data.details,
          priority: data.priority,
          status: data.status,
        });
      } catch (error) {
        toast.error('Incident not found or you are not authorized');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchIncident();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updateIncident(id, formData);
      toast.success('Incident updated successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading incident details...</p>;
  if (!incident) return null; // Or a not found component

  const isClosed = incident.status === 'Closed';

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-bold text-gray-800">Incident Details</h2>
          <Link to="/" className="text-blue-500 hover:underline">&larr; Back to Dashboard</Link>
      </div>

      {isClosed && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">This incident is closed and cannot be edited.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <p className="text-gray-500 text-sm">Incident ID</p>
            <p className="font-mono text-lg text-gray-800">{incident.incidentId}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">Details</label>
          <textarea name="details" id="details" value={formData.details} onChange={handleChange} disabled={isClosed}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-gray-100" rows="5" />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">Priority</label>
                <select name="priority" id="priority" value={formData.priority} onChange={handleChange} disabled={isClosed}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-gray-100">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">Status</label>
                <select name="status" id="status" value={formData.status} onChange={handleChange} disabled={isClosed}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-gray-100">
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
        </div>
        <div className="mt-6 flex items-center justify-end">
          <button type="submit" disabled={isClosed}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300">
            Update Incident
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditIncident;