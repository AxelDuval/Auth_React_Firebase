import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function SignInModal() {
  const { modalState, toggleModals, signIn } = useContext(UserContext);
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

    try {
      // Await datas from SignUp inputs
      const cred = await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      );

      // Empty the inputs
      //   formRef.current.reset();
      setValidation("");
      toggleModals("close");
      navigate("/private/private-home");
    } catch {
      // If error, show it in the modal
      setValidation("Oops, email and/or password incorrect");
    }
  };
  // Close the modal and the error
  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };
  return (
    <>
      {modalState.signInModal && (
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
                  <h5 className="modal-title">Sign In</h5>
                  <button className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <form
                    ref={formRef}
                    onSubmit={handleForm}
                    className="sign-up-form"
                  >
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signInEmail">
                        Email adress
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        type="email"
                        className="form-control"
                        id="signInEmail"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="signInPwd">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        type="password"
                        className="form-control"
                        id="signInPwd"
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
