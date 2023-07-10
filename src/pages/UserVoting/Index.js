import React, { useEffect, useState } from "react";

function UserVoting() {
    const [data, setData] = useState([]);
    const [name, setName] = useState();
    const [candidate, setCandidate] = useState([]);
    const [data1, setData1] = useState();
    const [voterid, setVoterid] = useState();
    const [doneauth, setDoneAuth] = useState(false);

    let getBusiness = async () => {
        let result = await fetch('http://localhost:5000/v1/votinglist/getvotinglistdata', {
            method: 'GET',
            header: {
                'Cotent-Type': 'application/json',
            }
        });
        result = await result.json();
        if (result) {
            // console.log(result);
            var data1 = result.data.reverse();
            setData(data1);
            // console.log(data1);
            // console.log(data1[0].voterId[0][0]);
            data1.map((index1, key1) => {
                data1[key1].voterId.map((index, key) => {
                    // console.log(index);
                    const auth = localStorage.getItem('VoterType')
                    if (auth == data1[key1].voterId[key][0]) {
                        // console.log("done");
                        // console.log(data1[key1].candidate);
                        // console.log(data1[0].voterId[key][1]);
                        if (data1[key1].start == "runig") {
                            console.log(data1[key1].candidate);
                            var sentence = data1[key1].candidate;
                            setVoterid(data1[key1]._id);
                            sentence.split(",");
                            setCandidate(sentence.split(","));
                            // console.log(sentence.split(","));
                            console.log("Voting is started");
                        }
                    }
                    // console.log(data1[0].voterId[key][0]);
                })
            })
        }
    }

    const handlesubmit = async () => {
        // alert(data1 + voterid);
        const auth = localStorage.getItem('VoterID');
        let item = [auth, data1];
        let result2 = await fetch(`http://localhost:5000/v1/result/updateArray/${voterid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ voterID: item })
        })
        result2 = await result2.json();
        console.log(result2);

        if (result2) {
            let result3 = await fetch(`http://localhost:5000/v1/user/updateStatus/${auth}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: true })
            })
            result3 = await result3.json();
            window.location.href = '/userVotingPage';
        }
    }

    const logout = () => {
        alert("logout");
        localStorage.removeItem("VoterName");
        localStorage.removeItem("VoterID");
        localStorage.removeItem("VoterType");
        window.location.href = '/userVotingPage';
    }

    const getvoter = async () => {
        let result = await fetch('http://localhost:5000/v1/result/getcandidate', {
            method: 'GET',
            header: {
                'Cotent-Type': 'application/json',
            }
        });
        result = await result.json();
        // console.log(result.data);
        result.data.map((index, key) => {
            // console.log(index.voterID);
            if (!(index.selected === "Awaiting")) {
                index.voterID.map((index, key) => {
                    console.log(index[0]);
                    // console.log(key);
                    const voterID = localStorage.getItem('VoterID');
                    if (index[0] == voterID) {
                        setDoneAuth(true);
                        console.log("you alredy voted");
                    }

                })
            } else {

            }
            // console.log(key);
        })
    }

    useEffect(() => {
        const name = localStorage.getItem('VoterName');
        setName(name);
        getBusiness();
        getvoter();
    }, [])

    return (
        <>
            <div class="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
                <div class=" flex items-center justify-between h-full px-6  ">
                    <div>
                        <p class="font-semibold">Hello {name}</p>
                    </div>
                    <div>
                        <p class="font-semibold cursor-pointer" onClick={logout}>Logout</p>
                    </div>
                </div>
            </div>
            {
                !doneauth ?
                    <>
                        {
                            candidate.map((index, key) => {
                                return (
                                    <>
                                        <div class="flex  justify-center justify-items-center h-full">
                                            <input type="radio" value={index} name="gender" class="w-5 h-5" onChange={e => setData1(e.target.value)} /> {index}
                                        </div>
                                    </>
                                )
                            })
                        }
                        <button class="bg-blue-500 p-2 px-3 rounded-3 text-white" onClick={handlesubmit}>Submit</button>
                    </>
                    : <p>Vote done</p>
            }

        </>
    )
}

export default UserVoting;