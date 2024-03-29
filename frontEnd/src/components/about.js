import React from "react";
const About = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <strong>Taskify</strong> - Organize and track your task
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Welcome to the application.{" "}
            <strong>Be ready for taking notes.</strong>
          </li>
          <li className="list-group-item">
            This application allows you to save your notes / todos in an
            effective manner.
          </li>
          <li className="list-group-item">
            Once you login / register to this platform, you will get all the
            rights to access, delete and update your note.
          </li>
          <li className="list-group-item">
            This about page will help you to learn <strong>How to use</strong>{" "}
            this platform.
          </li>
        </ul>
      </div>
      <div className="starters d-flex flex-column align-items-center my-5">
        Stay organized and on top of your tasks with our task application,
        designed to simplify your life and increase your productivity.
        <br />
        Manage your tasks with ease using our intuitive task application,
        featuring customizable lists, reminders, and collaboration tools.
      </div>
      <div className="accordion" id="accordionExample">
        <h4 className="head my-2">Frequently Asked Questions</h4>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Why am I not able to add a note?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              First Register / Login. You must provide a note title of minimum 5
              characters and note description of minimum 10 characters.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Why am I not able to register?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              You must provide a username of atleast 5 characters and a strong
              password of about 8 characters or more.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              The above register answer doesn't suits to me.
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              You are trying to register with an already registered mail id.
              Please try to Login.
            </div>
          </div>
        </div>
      </div>
      <h5 className="mt-3">Thank You for using the application.</h5>
    </div>
  );
};

export default About;
