import { useState, useEffect } from 'react';
import Card from '../components/card';

export default function Dashboard() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [userno, setUserNo] = useState();
  const [noapprove, setNoapprove] = useState();
  const [noofVoting, setNoofVoting] = useState();
  const [usertype, setUserType] = useState();
  const [username, setUserName] = useState();

  let getBusiness = async () => {
    let result = await fetch('http://localhost:5000/v1/business/getbusiness', {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      }
    });
    result = await result.json();
    if (result) {
      // console.log(result);
      var data1 = result.data.reverse();
      let count = 0;
      let count1 = 0;
      data1.map((value) => {
        if (!value.approve) {
          // console.log(value.businessName);
          count1 = count1 + 1;
          // console.log(count1);
        } else {
          // console.log("ok");
        }
        count = count + 1;
      })
      setUserNo(count);
      setNoapprove(count1);
    }
  }

  let getvotinglistdata = async () => {
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
      let count2 = 0;
      data1.map((value) => {
        count2 = count2 + 1;
      })
      setNoofVoting(count2);
      console.log(count2);
      // console.log(data1.cendidate);
    }
  }


  // for client start
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
      // console.log(result);
      var data1 = result.data.reverse();
      let count = 0;
      let count1 = 0;
      data1.map((value) => {
        console.log(value.status);
        if (!value.status) {
          // console.log(value.businessName);
          count1 = count1 + 1;
          // console.log(count1);
        } else {
          // console.log("ok");
        }
        count = count + 1;
      })
      setUserNo(count);
      setNoapprove(count1);
    }
  }

  let getVotingListById = async () => {
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
      // console.log(result);
      var data1 = result.data.reverse();
      let count2 = 0;
      data1.map((value) => {
        count2 = count2 + 1;
      })
      setNoofVoting(count2);
      console.log(count2);
      // console.log(data1.cendidate);
    }
  }
  // for client end





  const fetchCoroutines = async () => {
    setLoading(false)
  }

  useEffect(() => {
    const name = localStorage.getItem('UserName');
    setUserName(name);
    const auth = localStorage.getItem('UserType');
    setUserType(auth)
    console.log(auth);
    if (auth === "Admin") {
      getBusiness()
      getvotinglistdata()

    } else {
      getBusinessById();
      getVotingListById();
    }
    fetchCoroutines()

  }, [])

  if (loading)
    return (
      <div class="text-center">
        <div role="status">
          <svg aria-hidden="true" class="inline w-12 h-12 mr-2 mt-10 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    )

  else
    return (


      <div class="container px-6 mx-auto grid">
        <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Dashboard ({usertype})
        </h2>

        <p class="mb-8 text-gray-600 dark:text-gray-400">
          Welcome {username}
        </p>

        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <Card title={'Total Client'} value={userno} color={'gray'} icon={"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"} />
          <Card title={'Client Request'} value={noapprove} color={'purple'} icon={"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"} />
          <Card title={'Total Voting'} value={noofVoting} color={'blue'} icon={"M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"} />
        </div>

        {/* {userType === 'ORG-ADMIN' &&
          <>
            <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              <Card title={`Number of people working more than ${workingHour} hours today`} value={workingHourMoreToday} color={'green'} icon={"M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"} />
              <Card title={`Number of people working less than ${workingHour} hours today`} value={workingHourLessToday} color={'orange'} icon={"M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"} />
            </div>
            <div className='w-80 items-center justify-between p-4 mb-8 text-sm font-semibold bg-white shadow-xs rounded-lg focus:outline-none focus:shadow-outline-purple'>
              <label for="default-range" class="block mb-2 text-sm font-medium text-gray-900">Working hour duration: {workingHour}</label>
              <input id="default-range" type="range" defaultValue={workingHour} min='1' max="18" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" onChange={e => { setWorkingHour(e.target.value) }} />
            </div>
          </>} */}
      </div>
    )
}