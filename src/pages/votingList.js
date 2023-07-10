import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { OutTable, ExcelRenderer } from 'react-excel-renderer'
export default function VotingList({ type, userId, userType, changePage }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [votingname, setVotingName] = useState('');
    const [candidate, setCandidate] = useState('');
    const [noofuser, setNoofuser] = useState(0);
    const [date, setDate] = useState('');
    const [businessVari, setBusinessVari] = useState(false);
    const [startAuth, setStartAuth] = useState(false);
    // for Read the data from excel
    const [postedby, setPostedby] = useState('');
    const [header, setHeader] = useState([]);
    const [cols, setCols] = useState([]);
    const [idArray, setIdArray] = useState([]);
    const [cand, setCand] = useState();
    const [can, setCan] = useState([]);
    const handleFile = (event) => {
        const file = event.target.files[0];
        ExcelRenderer(file, (err, response) => {
            if (err) {
                console.log(err);
            } else {
                // setHeader(response.rows[0]);
                setCols(response.rows);
                setIdArray(response.rows.id)
                cols.map((item, key) => {
                    console.log(response.rows);
                    console.log(response.rows);
                    // idArray = [...idArray, '1'];
                    // console.log(idArray);
                    console.log(idArray);
                })
                console.log(response.rows);
            }
        })
    }
    // for end excel


    // for Add voting list
    const handlesubmit = async () => {
        const businessID = localStorage.getItem('BusinessID');
        const businessName = localStorage.getItem('BusinessName');
        setNoofuser(cols.length);
        if (noofuser > 0) {
            cols.map(async (item) => {
                console.log(item[0] + item[1] + item[2] + cols.length);
                let result1 = await fetch('http://localhost:5000/v1/user/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userID: item[0], name: item[1], decription: item[2], phone: item[3], email: item[4], businessID, businessName })
                })
                result1 = await result1.json();
                console.log(result1);
                let result2 = await fetch('http://localhost:5000/v1/user/sendOtp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userID: item[0], email: item[4], date })
                })
                result2 = await result2.json();
                console.log(result2);
            })
        }
        // handleFile();


        // const businessID = localStorage.getItem('BusinessID');
        if (!votingname) {
            console.log(votingname + "error1");
        } else if (!candidate) {
            console.log(candidate + "error2");
        } else if (!noofuser) {
            console.log(noofuser + "error3");
        } else if (!businessID) {
            console.log(businessID + "error4");
        } else {
            let selected = "Awaiting";
            // let businessID = "jhgfvdhbsjanm";
            let item = { votingname, candidate, noofuser, date, selected, voterId: cols, businessID };
            console.log(item);

            let result = await fetch('http://localhost:5000/v1/votinglist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            })
            result = await result.json();
            // console.log(result.success);
            // console.log(result.message);
            setCand(result.message.candidate)
            if (result.success) {
                // console.log(result.message.candidate);
                // console.log(result.message._id);
                let items = [result.message.candidate];
                let result5 = await fetch('http://localhost:5000/v1/result/candidate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ votingID: result.message._id, candidate: items })
                })
                window.location.href = '/votingList';
            }

        }
    }
    // for end voting list


    const [data, setData] = useState([]);
    let getBusiness = async () => {
        let result = await fetch('http://localhost:5000/v1/votinglist/getvotinglistdata', {
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

    let getBusinessById = async () => {
        const id = localStorage.getItem('BusinessID');
        console.log(id);
        let result = await fetch(`http://localhost:5000/v1/votinglist/getvotinglistbyid?businessID=${id}`, {
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

    let getBusinessByIdFor = async () => {
        const auth = localStorage.getItem('BusinessID');
        let result = await fetch(`http://localhost:5000/v1/business/getBusinessByIdFor/${auth}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        result = await result.json();
        console.log(result.approve);
        if (result.approve) {

        } else {
            setBusinessVari(true);
        }
        console.log(result);
    }

    let updateVotingListStart = async (dan) => {
        console.log(dan);
        let result = await fetch(`http://localhost:5000/v1/votinglist/updateVotingListStart/${dan}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ start: "runig" })
        })
        result = await result.json();
        console.log(result);
        window.location.href = '/votingList';
        if (result) {
            alert("Start")
        }
    }

    let updateVotingListStop = async (dan) => {
        console.log(dan);
        let result = await fetch(`http://localhost:5000/v1/votinglist/updateVotingListStart/${dan}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ start: "done" })
        })
        result = await result.json();
        console.log(result);
        console.log(result.task.candidate);

        // window.location.href = '/votingList';
        // if (result) {
        const id = localStorage.getItem('UserID');
        // console.log(id);
        // let result5 = await fetch(`http://localhost:5000/v1/result/getCandidateById/${dan}`, {
        //     method: 'GET',
        //     header: {
        //         'Cotent-Type': 'application/json',
        //     }
        // });
        // result5 = await result5.json();
        // // if(result5.)
        // console.log(result5.voterID);
        // result5.voterID.map((index, key) => {
        //     console.log(index);
        //     console.log(key);
        // })
        var sentence = result.task.candidate;
        console.log(sentence);
        sentence.split(",");
        setCan(sentence.split(","));
        console.log(can[1]);
        can.map((index, key) => {
            console.log(index);
            console.log(key);
        })
        console.log(sentence[1]);


        // let result3 = await fetch(`http://localhost:5000/v1/votinglist/updateSelected/${dan}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ start: "done" })
        // })

        alert("write the code for Update data");
        // }
        //Yaha pe fetch karenge Data Ki kon win huaa or use Selected me update kr denge
    }
    // for VotingList end


    useEffect(() => {
        getBusinessByIdFor();
        const auth = localStorage.getItem('UserType');
        console.log(auth);
        if (auth === "Admin") {
            getBusiness();
        } else {
            getBusinessById();
            setStartAuth(true);
        }
    }, [])
    return (
        <>

            <p class="text-gray-500 ml-10 my-7">Voting List</p>

            {
                !businessVari ?
                    <div class='my-6 ml-4'>
                        <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-blue-800 bg-blue-700 px-3 py-2  rounded-lg" onClick={handleShow}>new Vote</a>
                    </div>
                    : <p>Business Not Verified</p>
            }

            {
                show &&
                <div class=" flex justify-center ...">
                    <form class="w-full max-w-lg absolute z-50 top-20 bg-white  px-3 py-2 rounded-lg">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    Voting Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Voting Name" value={votingname} onChange={(e) => setVotingName(e.target.value)} />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-2">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                    candidate
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="candidate" value={candidate} onChange={(e) => setCandidate(e.target.value)} />
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                    user csv
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="file" placeholder="Description" onChange={handleFile} />
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                    Date
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
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
                                S No.
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Voting Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                candidate
                            </th>
                            <th scope="col" class="px-6 py-3">
                                No. Of User
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Selected
                            </th>
                            {!startAuth ? <th scope="col" class="px-6 py-3">
                                Start
                            </th> : <p></p>}

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((value, key) => {
                                return (
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {key}
                                        </th>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {value.votingname}
                                        </th>
                                        <td class="px-6 py-4">
                                            {value.candidate}
                                        </td>
                                        <td class="px-6 py-4">
                                            {value.noofuser}
                                        </td>
                                        <td class="px-6 py-4">
                                            {value.date}
                                        </td>
                                        <td class="px-6 py-4">
                                            <p class="text-green-600">{value.selected}</p>
                                        </td>
                                        {!startAuth ?
                                            <td class="px-6 py-4">
                                                {value.start == "start" ?
                                                    <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-blue-800 ml-4 bg-blue-700 px-3 py-1 rounded-lg" onClick={() => updateVotingListStart(value._id)}>Start</a>
                                                    : value.start == "runig" ? <a href="#" class="font-medium text-white dark:text-blue-500 hover:bg-red-800 ml-4 bg-red-700 px-3 py-1 rounded-lg" onClick={() => updateVotingListStop(value._id)}>Stop</a>
                                                        : value.start == "done" ? <p class="text-green-600">done</p>
                                                            : <p></p>
                                                }
                                            </td> : <p></p>
                                        }
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