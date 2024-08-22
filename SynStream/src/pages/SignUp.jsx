import { Alert, Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../component/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
        setShowModal(false); // Close the modal on successful sign-up
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        color="gray"
      >
        <Modal.Body>
          <div className="mt-5">
            <div className="font-semibold flex items-center justify-center text-2xl mb-5">Sign Up</div>
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
              {/* Right */}
              <div className="flex-1">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div>
                    <Label value="Your username" />
                    <TextInput
                      placeholder="Username"
                      type="text"
                      id="username"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label value="Your email" />
                    <TextInput
                      placeholder="name@company.com"
                      type="email"
                      id="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label value="Your password" />
                    <TextInput
                      placeholder="Password"
                      type="password"
                      id="password"
                      onChange={handleChange}
                    />
                  </div>
                  <Button
                    gradientDuoTone="purpleToPink"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-3">Loading...</span>
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                  <OAuth />
                </form>
                <div className="flex gap-2 text-sm mt-5">
                  <span>Have an account?</span>
                  <Link to="/sign-in" className="text-blue-500">
                    Sign In
                  </Link>
                </div>
                {errorMessage && (
                  <Alert className="mt-5" color="failure">
                    {errorMessage}
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Footer */}
      {/* <footer className="mt-auto bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
