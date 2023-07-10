import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function Users({ type, userId, userType, changePage }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    // for business start
    let getBusiness = async () => {
        let result = await fetch('http://localhost:5000/v1/user/getuserdata', {
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

            data1.map(async () => {
                let result1 = await fetch('http://localhost:5000/v1/result/getcandidate', {
                    method: 'GET',
                    header: {
                        'Cotent-Type': 'application/json',
                    }
                });
                result1 = await result1.json();
                // console.log(result.data);
                result.data.map((index, key) => {
                    // console.log(index.voterID);
                    // index.voterID.map((index, key) => {
                    console.log(index[0]);
                    // console.log(key);
                    // const voterID = localStorage.getItem('VoterID');
                    if (index[0] == data1._id) {
                        // setDoneAuth(true);
                        console.log("you alredy voted");
                        let result2 = fetch(`http://localhost:5000/v1/votinglist/updateVotingListStart/${data1._id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ status: true })
                        })
                        result2 = result2.json();
                        console.log(result);
                    }
                    // })
                    // console.log(key);
                })
            })


        }
    }
    // for business end

    useEffect(() => {
        getBusiness()
    }, [])
    return (
        <>
            {/* <p>User table</p> */}
            <p class="text-gray-500 ml-10 my-7"> VOTING NAME :- For College CR</p>
            <div class='my-6 ml-4 flex-1 items-center'>
                <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-blue-800 bg-blue-700 px-3 py-2  rounded-lg " onClick={handleShow}>Create User</a>
            </div>
            {
                show &&
                <div class=" flex justify-center ...">
                    <form class="w-full max-w-lg absolute z-50 top-20 bg-white  px-3 py-2 rounded-lg">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    User ID
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="User Id" />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                    User Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="User Name" />
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                    Description
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Description" />
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                    Phone
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Description" />
                            </div>  <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                    Email
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Description" />
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                    Business ID
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Business Id" />
                            </div>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" >
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
                                User Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                User name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Business Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((value) => {
                                return (
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {value.userID}
                                        </th>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {value.name}
                                        </th>
                                        <td class="px-6 py-4">
                                            {value.decription}
                                        </td>
                                        <td class="px-6 py-4">
                                            {value.businessName}
                                        </td>
                                        <td class="px-6 py-4">
                                            {value.status ? <p class="text-green-600">Vote Done</p> : <p class="text-red-600">Vote Not Done</p>}

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}