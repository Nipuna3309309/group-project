import appointmentModel from "../models/appointmentModel.js";
import slugify from "slugify";

export const createAppointmentController = async (req, res) => {
  try {
    const { firstname, lastname, description, type, specialization, address, date, phoneNumber } = req.body;

    if (!firstname || !lastname || !type || !specialization || !address || !date || !phoneNumber ) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const existingAppointment = await appointmentModel.findOne({ firstname, lastname, date });
    
    if (existingAppointment) { 
      return res.status(200).send({
        success: true,
        message: "Appointment already exists",
      });
    }

    const appointment = await new appointmentModel({
      firstname,
      lastname,
      description,
      type,
      specialization,
      address,
      date,
      phoneNumber,
   
    }).save();

    res.status(201).send({
      success: true,
      message: "New appointment created",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error creating appointment",
    });
  }
};

export const updateAppointmentController = async (req, res) => {
  try {
    const { firstname, lastname, description, type, specialization, address, date, phoneNumber } = req.body;
    const { id } = req.params;

    const appointment = await appointmentModel.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        description,
        type,
        specialization,
        address,
        date,
        phoneNumber,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error updating appointment",
    });
  }
};

export const getAppointmentController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.status(200).send({
      success: true,
      message: "All Appointments List",
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all appointments",
    });
  }
};

export const getSingleAppointmentController = async (req, res) => {
  try {
    const appointment = await appointmentModel.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "Get Single Appointment Successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single appointment",
    });
  }
};

export const deleteAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    await appointmentModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error deleting appointment",
    });
  }
};
