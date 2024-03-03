import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { requestAnon } from '../axios_helper'
import '../styles/Contact.css';

const Contact = () => {


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
        requestAnon("POST", '/api/contact', formData)
            .then((response) => {
                setFormData({
                    name: "",
                    email: "",
                    contactStatus: "",
                    message: ""
                });
                //------------------------------------------------------------------------------------
                window.location.reload(false);
                //------------------------------------------------------------------------------------
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

            <form action="" method="POST" class="modal fade" id="contactModal" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={onContactSubmit}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Contact Us</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="mb-3 form-outline mb-4">
                                <label htmlFor="name" className="form-label contact-form">Name</label>
                                <input type="text input-lg" name="name" className="form-control" placeholder="Name" onChange={onChangeHandler} />
                            </div>
                            <div className="mb-3 form-outline mb-4">
                                <label htmlFor="email" className="form-label contact-form">Email</label>
                                <input type="email" name="email" className="form-control" placeholder="email" onChange={onChangeHandler} />
                            </div>
                            <div className="mb-3 form-outline mb-4">
                                <label htmlFor="status" className="form-label contact-form">Category</label>
                                <select class="form-select" name="contactStatus" aria-label="select status" onChange={onChangeHandler}>
                                    <option value="0">QUESTIONS</option>
                                    <option value="1">TECHNICAL</option>
                                    <option value="2">FEEDBACK</option>
                                    <option value="3">OTHER</option>
                                </select>
                            </div>
                            <div className="mb-3 form-outline mb-4">
                                <label htmlFor="textarea" className="form-label">Message</label>
                                <textarea className="form-control" name="message" rows={4} onChange={onChangeHandler}></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit button" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Contact;