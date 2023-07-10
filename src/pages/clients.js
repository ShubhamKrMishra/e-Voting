import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { OutTable, ExcelRenderer } from 'react-excel-renderer'
export default function Clients({ type, userId, userType, changePage }) {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    // const [postedby, setPostedby] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [isAutheticated, setIsAutheticated] = useState(false);
    const [token, setToken] = useState(false);

    // for Read the data from excel
    const [header, setHeader] = useState([]);
    const [cols, setCols] = useState([]);
    const handleFile = (event) => {
        const file = event.target.files[0];
        ExcelRenderer(file, (err, response) => {
            if (err) {
                console.log(err);
            } else {
                setHeader(response.rows[0]);
                setCols(response.rows);
                console.log(response.rows);
            }
        })
    }
    // for end excel

    // for Add Business
    const handlesubmit = async () => {
        const postedby = localStorage.getItem('UserID');
        console.log("hii");
        if (!postedby) {
            console.log(postedby);
        } else if (!businessName) {
            console.log(businessName);
        } else if (!description) {
            console.log(description);
        } else {
            let item = { postedby, businessName, description };
            console.log(item);
            let result = await fetch('http://localhost:5000/v1/business/business', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            })
            result = await result.json();
            console.log(result);
            // console.log(result.message._id);
            localStorage.setItem('BusinessID', (result.message._id));
            localStorage.setItem('BusinessName', (result.message.businessName))
            window.location.href = '/clients';
        }
    }
    // for end Business


    // for business start
    let getBusiness = async () => {
        let result = await fetch('http://localhost:5000/v1/business/getbusiness', {
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            }
        });
        result = await result.json();
        if (result) {
            console.log(result);
            var data1 = result.data.reverse();
            setData(data1);
        }
    }


    let getBusinessById = async () => {
        const id = localStorage.getItem('UserID');
        console.log(id);
        let result = await fetch(`http://localhost:5000/v1/business/getBusinessdatabyid?postedby=${id}`, {
            method: 'GET',
            header: {
                'Cotent-Type': 'application/json',
            }
        });
        result = await result.json();
        if (result) {
            console.log(result);
            var data1 = result.data.reverse();
            setData(data1);
            console.log(data1.cendidate);
        }
    }

    let updateBusinessById = async (dan) => {
        console.log(dan);
        let result = await fetch(`http://localhost:5000/v1/business/updateApprove/${dan}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: true, approve: true })
        })
        result = await result.json();
        console.log(result);
    }

    let deleteBusinessById = async (dan) => {
        console.log(dan);
        let result = await fetch(`http://localhost:5000/v1/business/deleteBusinessById/${dan}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        result = await result.json();
        console.log(result);
        if (result) {
            alert("Data Deleted");
            window.location.href = '/clients';
        }
    }



    // for business end

    useEffect(() => {
        const auth = localStorage.getItem('UserType');
        console.log(auth);
        if (auth === "Admin") {
            getBusiness();
            setIsAutheticated(true);
        } else {
            getBusinessById();
            setToken(true);
        }
    }, [])

    return (
        <>
            <p class="text-gray-500 ml-10 my-7">Client List</p>

            <div class='my-6 ml-4'>
                {/* <input type='file' onChange={handleFile} ></input> */}
                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-blue-800 bg-blue-700 px-3 py-2  rounded-lg" onClick={handleShow}>Create Client</a>
            </div>

            {
                show &&
                <div class=" flex justify-center ...">
                    <form class="w-full max-w-lg absolute z-50 top-20 bg-white  px-3 py-2 rounded-lg">
                        {/* <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    User ID
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="posted By" value={postedby} onChange={(e) => setPostedby(e.target.value)} />
                            </div>
                        </div> */}
                        <div class="flex flex-wrap -mx-3 mb-2">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                    Business Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                    Description
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handlesubmit}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </div>
                    </form>
                </div>
            }
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="col" class="px-6 py-3">
                                Business name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            {
                                isAutheticated ?
                                    <th scope="col" class="px-6 py-3">
                                        Approve
                                    </th> : <p></p>
                            }
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((value) => {
                                return (
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {value.businessName}
                                        </th>
                                        <td class="px-6 py-4">
                                            {value.description}
                                        </td>
                                        <td class="px-6 py-4">
                                            {value.status ? <p class="text-green-600">Aproved</p> : <p class="text-red-600">Not Aproved</p>}
                                        </td>
                                        {
                                            isAutheticated ?
                                                <td class="px-6 py-4">
                                                    {value.approve ? <p>Done</p> : <><a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg" onClick={() => updateBusinessById(value._id)}>Yes</a><a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg">No</a></>}
                                                </td> : <p></p>
                                        }
                                        <td class="px-6 py-4">
                                            {/* <div onClick={navigate'/view'}>Hi </div> */}
                                            <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-green-800 ml-4 bg-green-700 px-3 py-1 rounded-lg">View</a>
                                            {!token ? <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1  rounded-lg" onClick={() => deleteBusinessById(value._id)}>Delete</a> : <p></p>}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div >


        </>
    )
}