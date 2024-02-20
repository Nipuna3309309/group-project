import React, { useState } from 'react';
import axios from 'axios';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    description: '',
    type: 'Morning',
    specialization: 'Hardware Service',
    address: '',
    date: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = '/api/v1/appointment/create-appointment';
      const response = await axios.post(apiUrl, formData);

      console.log('Form Data submitted successfully!', response.data);
      // Add any further logic after a successful form submission
    } catch (error) {
      console.error('Error submitting form data:', error.message);
      // Handle the error appropriately, such as displaying an error message to the user
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Type:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
        </label>
        <br />
        <label>
          Specialization:
          <select name="specialization" value={formData.specialization} onChange={handleChange}>
            <option value="Hardware Service">Hardware Service</option>
            <option value="Software Service">Software Service</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address}  onChange={handleChange} required />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getCurrentDate()}
            required
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookingPage;
