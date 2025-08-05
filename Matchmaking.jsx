
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

const Matchmaking = () => {
  const [reps, setReps] = useState([]);
  const [innovators, setInnovators] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    specialty: '',
    territory: ''
  });

  useEffect(() => {
    const db = getFirestore();
    const unsubReps = onSnapshot(collection(db, 'reps'), (snapshot) => {
      setReps(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    const unsubInnovators = onSnapshot(collection(db, 'innovators'), (snapshot) => {
      setInnovators(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unsubReps();
      unsubInnovators();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { role, specialty, territory } = formData;
    const filtered = role === 'rep'
      ? innovators.filter(item =>
          item.specialty?.toLowerCase().includes(specialty.toLowerCase()) &&
          item.territory === territory
        )
      : reps.filter(item =>
          item.specialty?.toLowerCase().includes(specialty.toLowerCase()) &&
          item.territory === territory
        );

    setTimeout(() => {
      setMatches(filtered);
      setLoading(false);
    }, 500);
  };

  return (
    <section id="matchmaking" className="p-8 bg-white rounded-xl shadow-lg text-center">
      <h2 className="text-3xl font-bold text-[#343A40] mb-6 text-center">AI Matchmaking</h2>
      <p className="max-w-3xl mx-auto leading-relaxed mb-12">
        Enter your role and criteria to see who you’re most aligned with.
      </p>
      <form className="max-w-xl mx-auto text-left" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Your Role</label>
            <select name="role" value={formData.role} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">Select</option>
              <option value="rep">Sales Representative</option>
              <option value="devices">Medical Device Company</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Specialty</label>
            <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Territory</label>
          <select name="territory" value={formData.territory} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="">Select territory</option>
            <option value="northeast">Northeast (US)</option>
            <option value="southeast">Southeast (US)</option>
            <option value="midwest">Midwest (US)</option>
            <option value="southwest">Southwest (US)</option>
            <option value="west">West (US)</option>
          </select>
        </div>
        <div className="mt-8 text-center">
          <button type="submit" className="bg-[#28A745] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#218838] transition-colors duration-300 shadow-md">
            {loading ? "Searching..." : "Find My Match"}
          </button>
        </div>
      </form>

      <div className="mt-12 text-left space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Searching for matches...</p>
        ) : matches.length > 0 ? (
          <>
            <p className="text-xl font-semibold text-[#343A40]">Matches Found:</p>
            {matches.map((match, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-lg font-bold">{match.name || match.companyName}</p>
                <p className="text-sm text-gray-600">Specialty: {match.specialty || match.productCategory}</p>
                <p className="text-sm text-gray-600">Territory: {match.territory}</p>
                <p className="text-sm text-gray-600 mt-2">{match.bio || match.description}</p>
              </div>
            ))}
          </>
        ) : (
          <p className="text-center text-gray-500">No matches found.</p>
        )}
      </div>
    </section>
  );
};

export default Matchmaking;
