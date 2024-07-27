import { useRef } from "react";
import { Select } from "./components/Select";
import * as AWS from 'aws-sdk';
import config from './config'

// Configure AWS SDK for DynamoDB
AWS.config.update({
    region: 'us-east-1', 
    // endpoint: 'dynamodb.us-east-1.amazonaws.com',
    accessKeyId: config.awsAccessKeyId, // update your accessKeyId here!!!!This will be available after creating the IAM role
    secretAccessKey:  config.awsSecretAccessKey// update your secretAccessKey here(DONOT FORGET TO NOTE THESE TWO)
})

const dbClient = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES({
    region: 'us-east-1',
    smtp: {
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 587,
        auth: {
            user: config.sesAccessKeyId, //This comes when u create a smtp
            pass: config.sesSecretAccessKey
        }
    }
})

export const LandingPage = () => {
    const nameRef = useRef();
    const phoneRef = useRef();
    const ageRef = useRef();
    const emailRef = useRef();
    const locationRef = useRef();
    const serviceRef = useRef();

    const locations = [
        { value: 'New York', label: 'New York' },
        { value: 'Los Angeles', label: 'Los Angeles' },
        { value: 'Chicago', label: 'Chicago' },
        { value: 'Houston', label: 'Houston' },
        { value: 'Miami', label: 'Miami' }
    ];

    const services = [
        { value: 'General Checkup', label: 'General Checkup' },
        { value: 'Dental', label: 'Dental' },
        { value: 'Pediatrics', label: 'Pediatrics' },
        { value: 'Orthopedics', label: 'Orthopedics' },
        { value: 'Cardiology', label: 'Cardiology' }
    ];

    const submitForm = async (e) => {
        e.preventDefault();
        const _name = nameRef.current.value;
        const _phone = phoneRef.current.value;
        const _age = ageRef.current.value;
        const _email = emailRef.current.value;
        const _location = locationRef.current.value;
        const _service = serviceRef.current.value;

        // DynamoDB params
        const dbParams = {
            TableName: 'mail-ses-table', //This is the name of the table that you created in dynamo DB
            Item: {
                name: _name,
                phone: _phone,
                age: _age,
                email: _email,
                location: _location,
                service: _service
            }
        };

        try {
            // Put item into DynamoDB
            await dbClient.put(dbParams).promise();

            // SES email params with details
            const emailParams = {
                Source: 'a.jayaadithya13@gmail.com',
                Destination: {
                    ToAddresses: [_email]
                },
                Message: {
                    Subject: {
                        Data: 'Appointment Booking'
                    },
                    Body: {
                        Html: {
                            Data: `
                                <h1>Thank you for booking an appointment</h1>
                                <p>Here are the details you provided:</p>
                                <ul>
                                    <li><strong>Name:</strong> ${_name}</li>
                                    <li><strong>Phone:</strong> ${_phone}</li>
                                    <li><strong>Age:</strong> ${_age}</li>
                                    <li><strong>Email:</strong> ${_email}</li>
                                    <li><strong>Location:</strong> ${_location}</li>
                                    <li><strong>Service:</strong> ${_service}</li>
                                </ul>
                                <p>We shall contact you soon.</p>
                            `
                        }
                    }
                }
            };

            // Send email via SES
            await ses.sendEmail(emailParams).promise();
            console.log("Email sent successfully");
        } catch (err) {
            console.error("Error", err);
            console.log(config)
        }
    };

    return (
        <div className='main'>
        <section className="container">
            <section className="form-container">
                <h2>Book your Appointment</h2>
                <form onSubmit={submitForm}>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        ref={nameRef}
                    />
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        ref={phoneRef}
                    />
                    <input
                        type="number"
                        placeholder="Enter your age"
                        ref={ageRef}
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        ref={emailRef}
                    />
                    <Select
                        options={locations}
                        selectRef={locationRef}
                        placeholder="Select your location"
                    />
                    <Select
                        options={services}
                        selectRef={serviceRef}
                        placeholder="Select the service"
                    />
                    <button type="submit" className="submit">Submit</button>
                </form>
            </section>
            <footer>
                <small>2024-2025</small>
            </footer>
        </section>
        </div>
    );
};

