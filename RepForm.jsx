
import React, { useState } from 'react';
import { getFirestore, collection, doc, setDoc, getAuth } from 'firebase/firestore';

const RepForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    territory: '',
    linkedin: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) throw new Error('User not authenticated');

      const repRef = doc(collection(db, 'reps'), user.uid);
      await setDoc(repRef, {
        ...formData,
        createdAt: new Date().toISOString(),
        userId: user.uid,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  if (submitted) {
    return (
      <section id="rep" className="mb-16 p-8 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-[#28A745] mb-4">Thank you for signing up!</h2>
        <p className="text-gray-700">Your profile has been submitted successfully.</p>
      </section>
    );
  }

  return (
    <section id="rep" className="mb-16 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-[#343A40] mb-6 text-center">For Sales Representatives</h2>
      <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Medical Specialties</label>
          <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Your Current Territory</label>
          <select name="territory" value={formData.territory} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="">Select your territory</option>
            <option value="northeast">Northeast (US)</option>
            <option value="southeast">Southeast (US)</option>
            <option value="midwest">Midwest (US)</option>
            <option value="southwest">Southwest (US)</option>
            <option value="west">West (US)</option>
            <option value="canada">Canada</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="other">Other / Global</option>
          </select>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn Profile URL</label>
          <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <div className="mt-8 text-center">
          <button type="submit" className="bg-[#343A40] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#23272B] transition-colors duration-300 shadow-md">Join as a Rep</button>
        </div>
      </form>
    </section>
  );
};

export default RepForm;
