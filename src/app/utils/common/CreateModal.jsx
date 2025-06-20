import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { ADMIN_URL, AUTH_URL, MODAL_STYLES } from "../constants/constants";
import http from "../interceptors/auth";
import { toast } from "react-toastify";
export default function CreateModal({
  section,
  setRefresh,
  modalIsOpen,
  setIsOpen,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("00:30:00");
  const [location, setLocation] = useState("");

  // Worker fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    try {
      let payload = {};
      let url = `${ADMIN_URL}/api/${section}`;

      if (section === "services") {
        if (!name || !price || !duration) {
          toast.error("Please fill out all required fields.");
          return;
        }

        payload = {
          name,
          description,
          price: parseFloat(price),
          duration,
        };
      } else if (section === "saloons") {
        if (!name || !location) {
          toast.error("Please fill out all required fields.");
          return;
        }

        payload = {
          name,
          location,
          workHours: {
            monday: {
              open: "09:00:00",
              close: "17:00:00",
            },
            tuesday: {
              open: "09:00:00",
              close: "17:00:00",
            },
            wednesday: {
              open: "09:00:00",
              close: "17:00:00",
            },
            thursday: {
              open: "09:00:00",
              close: "17:00:00",
            },
            friday: {
              open: "09:00:00",
              close: "17:00:00",
            },
            saturday: {
              open: "09:00:00",
              close: "17:00:00",
            },
            sunday: {
              open: "09:00:00",
              close: "17:00:00",
            },
          },
        };
      } else if (section === "workers") {
        if (
          !firstName ||
          !lastName ||
          !email ||
          !password ||
          !confirmPassword
        ) {
          toast.error("Please fill out all fields.");
          return;
        }
        if (password !== confirmPassword) {
          toast.error("Passwords do not match.");
          return;
        }

        payload = {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        };

        url = `${AUTH_URL}/api/auth/register-worker`;
      } else {
        toast.error("Unsupported section");
        return;
      }

      await http.post(url, payload);
      toast.success(`Successfully created ${section.slice(0, -1)}`);
      setRefresh((prev) => !prev);
      setIsOpen(false);
      clearFields();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create " + section.slice(0, -1));
    }
  };

  const clearFields = () => {
    setName("");
    setDescription("");
    setPrice("");
    setLocation("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      style={MODAL_STYLES}
      contentLabel={`Add new ${section.slice(0, -1)}`}
      appElement={document.getElementById("app-root")} // Pass the app root here
      parentSelector={() => document.getElementById("app-modal")} // your modal container
    >
      <div className="space-y-4">
        <h2 className="text-xl font-bold capitalize">
          Create {section.slice(0, -1)}
        </h2>

        {section === "services" && (
          <>
            <input
              className="w-full border p-2 rounded"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="w-full border p-2 rounded"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="time"
              step="1"
              className="w-full border p-2 rounded"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </>
        )}

        {section === "saloons" && (
          <>
            <input
              className="w-full border p-2 rounded"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </>
        )}

        {section === "workers" && (
          <>
            <input
              className="w-full border p-2 rounded"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              className="w-full border p-2 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full border p-2 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-full border p-2 rounded"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}
