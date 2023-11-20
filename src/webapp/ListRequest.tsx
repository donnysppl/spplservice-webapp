import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RequestList } from '../interface';
import toast from 'react-hot-toast';

export default function ListRequest() {
  const { id } = useParams();

  const [userSerList, setuserSerList] = useState<RequestList[]>([]);
  const [userInstallList, setuserInstallList] = useState<RequestList[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {

    const userRequestList = async () => {
      setloading(true);
      await fetch(`${process.env.REACT_APP_BACKENDURL}/users/userServiceList/${id}`, {
        method: 'GET',
      }).then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            const data = res.result;
            const dataRev = data.reverse()
            setuserSerList(dataRev);
          }
          else if (res.status === 400) {
            toast.error(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        })

      await fetch(`${process.env.REACT_APP_BACKENDURL}/users/userInstallationList/${id}`, {
        method: 'GET',
      }).then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            const data = res.result;
            const dataRev = data.reverse()
            setuserInstallList(dataRev)
          }
          else if (res.status === 400) {
            toast.error(res.message);

          }
        })
        .catch(err => {
          console.log(err);
        })
        setloading(false);
    }

    userRequestList();
  }, [])

  return (
    <div className="container mx-auto ">

      <div className=" text-white vector-bg h-[80px] p-5 flex justify-between items-center">
        <div className='text-2xl font-bold leading-7'>
          Request List
        </div>
        <div className="user-icon">
          <svg className="svg-icon w-10 h-10 text-white border border-gray-200 rounded-full" fill='#ffffff' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" /></svg>
        </div>
      </div>


      {
        loading ? <div className='text-base text-center font-semibold p-5'>loading...</div> : 
        <>
        {
          userSerList.length ?
            <div className="p-5 bg-secondary">
              <h2 className='text-lg font-semibold mb-4'>Services Request List</h2>
              {
                userSerList && userSerList.map((item, index) => (
                  <div key={index} className='bg-white mb-3 p-5 rounded-lg' >
                    <div className='flex justify-between items-center'>
                      <div className="main-head text-sm font-semibold">
                        Services request of {item.productname}
                      </div>
                      <div className="main-head-status text-xs w-[100px] text-end ">
                        {item.status === 'initial' ?
                          <span className='bg-gray-300 text-gray-900 font-semibold py-1 px-1.5 rounded-lg'>Processing</span>
                          : item.status === 'pending' ?
                            <span className='bg-yellow-400 text-gray-900 font-semibold py-1 px-1.5 rounded-lg'>Pending</span>
                            : <span className='bg-green-400 text-gray-900 font-semibold py-1 px-1.5 rounded-lg'>Complete</span>
                        }
                      </div>
                    </div>
                    <div className="">
                      <ul className='text-sm border-t border-gray-200 mt-3 pt-3'>
                        <li>Request ID: <span className='font-semibold'>{item.request_id}</span></li>
                        <li>Brand: {item.brand}</li>
                        <li>Category: {item.productType}</li>
                        <li>Model: {item.productname}</li>
                        <li>warranty: {item.warranty}</li>
                        <li>Purchase Mode: {item.purchaseMode}</li>
                        <li>Purchase Date: {item.purchase_date}</li>
                        <li>Serial No: {item.set_serialno}</li>
                        <li>Query: {item.query}</li>
                      </ul>
                    </div>
                  </div>
                ))
              }
            </div> : 
            <div className='text-base text-center font-semibold p-5'>Data is empty</div>
          }
  
        {
          userInstallList.length ?
            <div className="p-5 bg-secondary">
              <h2 className='text-lg font-semibold mb-4'>Installation Request List</h2>
              {
                userInstallList && userInstallList.map((item, index) => (
                  <div key={index} className='bg-white mb-3 p-5 rounded-lg'>
                    <div className='flex justify-between items-center'>
                      <div className="main-head text-sm font-semibold">
                        Installation request of {item.productname}
                      </div>
                      <div className="main-head-status text-xs w-[100px] text-end ">
                        {item.status === 'initial' ?
                          <span className='bg-gray-300 text-gray-900 font-semibold py-1 px-1.5 rounded-lg'>Processing</span>
                          : item.status === 'pending' ?
                            <span className='bg-yellow-400 text-gray-900 font-semibold py-1 px-1.5 rounded-lg'>Pending</span>
                            : <span className='bg-green-400 text-gray-900 font-semibold py-1 px-1.5 rounded-lg'>Complete</span>
                        }
                      </div>
                    </div>
  
                    <div className="">
                      <ul className='text-sm border-t border-gray-200 mt-3 pt-3'>
                        <li>Request ID: <span className='font-semibold'>{item.request_id}</span></li>
                        <li>Brand: {item.brand}</li>
                        <li>Category: {item.productType}</li>
                        <li>Model: {item.productname}</li>
                        <li>warranty: {item.warranty}</li>
                        <li>Purchase Mode: {item.purchaseMode}</li>
                        <li>Purchase Date: {item.purchase_date}</li>
                        <li>Serial No: {item.set_serialno}</li>
                        <li>Query: {item.query}</li>
                      </ul>
                    </div>
                  </div>
                ))
              }
            </div> : null
        }
        </>
      }

      




    </div>

  )
}
