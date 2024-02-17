import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../axios_helper";
import '../styles/Contact.css';

const Contact = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        contactStatus: "",
        message: ""
    });

    useEffect(() => {
        setFormData({
            name: "",
            email: "",
            contactStatus: "",
            message: ""
        });
    }, [])

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onContactSubmit = (e) => {
        e.preventDefault();
        request("POST", '/api/contact', formData)
            .then((response) => {
                setFormData({
                    name: "",
                    email: "",
                    contactStatus: "",
                    message: ""
                });
                // navigate('/api')
            })
            .catch((error) => {
                console.error("Submission failed:", error)
            });
    }

    return (
        <div className="footer">
            <p className="footer-p">&copy; 2024 Team Crushers</p>
            <button type="button" class="btn contact-btn" data-bs-toggle="modal" data-bs-target="#contactModal">
                Contact Us
            </button>

            <form action="" method="POST" class="modal fade" id="contactModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={onContactSubmit}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Contact Us</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="mb-3 form-outline mb-4">
                                <label for="name" className="form-label contact-form">Name</label>
                                <input type="text input-lg" className="form-control" placeholder="Name" onChange={onChangeHandler} />
                            </div>
                            <div className="mb-3 form-outline mb-4">
                                <label for="email" className="form-label contact-form">Email</label>
                                <input type="email" className="form-control" placeholder="email" onChange={onChangeHandler} />
                            </div>
                            <div className="mb-3 form-outline mb-4">
                                <label for="status" className="form-label contact-form">Category`</label>
                                <select class="form-select" aria-label="select status" onChange={onChangeHandler}>
                                    <option selected>Choose one of the following</option>
                                    <option value="1">Questions</option>
                                    <option value="2">Technical</option>
                                    <option value="3">Feedback</option>
                                    <option value="3">Other</option>
                                </select>
                            </div>
                            <div className="mb-3 form-outline mb-4">
                                <label for="textarea" className="form-label">Message</label>
                                <textarea className="form-control" rows={4} onChange={onChangeHandler}></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit button" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Contact;

