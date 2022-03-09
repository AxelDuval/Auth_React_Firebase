import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function SignUpModal() {
  const { modalState, toggleModals, signUp } = useContext(UserContext);
  const navigate = useNavigate();
  const [validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const formRef = useRef([]);

  const handleForm = async (e) => {
    e.preventDefault();

    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("6 characters min");
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Passwords do not match");
      return;
    }

    try {
      // Await datas from SignUp inputs
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );

      // Empty the inputs
      formRef.current.reset();
      setValidation("");
      toggleModals("close");
      navigate("/private/private-home")
    } catch (err) {
      // If error, show it in the modal
      if (err.code === "auth/invalid-email") {
        setValidation("Email format invalid");
      }
      if (err.code === "auth/email-already-in-use") {
        setValidation("Email already used");
      }
    }
  };
  // Close the modal and the error
  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };
  return (
    <>
      {modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            className="w-100 h100 bg-dark bg-opacity-75"
            onClick={closeModal}
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sign Up</h5>
                  <button className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <form
                    ref={formRef}
                    onSubmit={handleForm}
                    className="sign-up-form"
                  >
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signUpEmail">
                        Email adress
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        type="email"
                        className="form-control"
                        id="signUpEmail"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="signUpPwd">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        type="password"
                        className="form-control"
                        id="signUpPwd"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="repeatPwd">
                        Repeat Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        type="password"
                        className="form-control"
                        id="repeatPwd"
                        required
                      />
                      <p className="text-danger mt-1">{validation}</p>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
