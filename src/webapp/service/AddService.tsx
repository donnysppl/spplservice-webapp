import React from 'react';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from 'react-router-dom';
import Thankyou from './Thankyou';

interface Brand {
  _id: string;
  name: string;
  categories: Categories[];
}
interface Categories {
  name: string;
  _id: string;
  category: Category[];
}
interface Category {
  _id: string;
  name: string;
}


export default function AddService() {
  const { id } = useParams();
  const router = useNavigate();

  const [serviceInp, setserviceInp] = useState({
    firstname: '',
    lastname: '',
    mobile: '',
    altmobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    brand: '',
    productType: '',
    productname: '',
    complaint_type: 'Service',
    warranty: '',
    purchaseMode: '',
    purchase_date: '',
    set_serialno: '',
    query: '',
    userId: '',
  });
  const [allProdData, setallProdData] = useState<Brand[]>([]);
  const [brand, setbrand] = useState<string>('');
  const [category, setcategory] = useState<string>('')
  const [model, setmodel] = useState<string>('')
  const [selectedBrandData, setselectedBrandData] = useState<Brand | undefined>();
  const [selectedCategData, setselectedCategData] = useState<Categories | undefined>();

  const [imgUpload, setimgUpload] = useState<boolean>(false);
  const [submitServId, setsubmitServId] = useState<string>('')

  const [invoice, setinvoice] = useState<File | undefined>();
  const [warranty, setwarranty] = useState<File | undefined>();
  const [issueImg, setissueImg] = useState<FileList | undefined>();

  const [thankyou, setthankyou] = useState({
    invoice: false,
    warranty: false,
    issueimg: false,
  })

  const [invoicety, setinvoicety] = useState<boolean>(false)
  const [warrty, setwarrty] = useState<boolean>(false)
  const [issueimgty, setissueimgty] = useState<boolean>(false)

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setbrand(e.target.value);
    const selectedBrandName = e.target.value;
    const selectedBrand = allProdData.find(item => item.name === selectedBrandName);
    setselectedBrandData(selectedBrand);
    setcategory("");
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setcategory(e.target.value);
    const selectedCategoryName = e.target.value;
    const selectedCategory = selectedBrandData?.categories.find(item => item.name === selectedCategoryName);
    setselectedCategData(selectedCategory);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value)
    setmodel(e.target.value)
  }

  useEffect(() => {
    const allProdSeries = async () => {
      await fetch(process.env.REACT_APP_BACKENDURL + '/products/getproduct', {
        method: 'GET',
      }).then(res => res.json())
        .then(res => {
          // console.log(res.result);
          if (res.status === 200) {
            setallProdData(res.result);
          }
          else if (res.status === 403) {
            toast.error(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
    allProdSeries();
  }, [])

  const onserviceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      firstname: serviceInp.firstname,
      lastname: serviceInp.lastname,
      mobile: serviceInp.mobile,
      altmobile: serviceInp.altmobile,
      email: serviceInp.email,
      address: serviceInp.address,
      city: serviceInp.city,
      state: serviceInp.state,
      pincode: serviceInp.pincode,
      brand: brand,
      productType: category,
      productname: model,
      complaint_type: serviceInp.complaint_type,
      warranty: serviceInp.warranty,
      purchaseMode: serviceInp.purchaseMode,
      purchase_date: serviceInp.purchase_date,
      set_serialno: serviceInp.set_serialno,
      query: serviceInp.query,
      userId: id,
    }
    await fetch(`${process.env.REACT_APP_BACKENDURL}/users/detailupdate/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => {
        // console.log(res);
        if (res.status === 200) {
          toast.success(res.message);
          setimgUpload(true);
          setsubmitServId(res.id);
        }
        else if (res.status === 400) {
          toast.error(res.message);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }


  const onInvoiceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('invoice', invoice as File);

    await fetch(`${process.env.REACT_APP_BACKENDURL}/users/invoiceupdate/${submitServId}`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_BACKENDURL}`
      },
      body: formdata
    }).then(res => res.json())
      .then(res => {
        // console.log(res);
        if (res.status === 200) {
          toast.success(res.message);
          setinvoicety(true);
        }
        else if (res.status === 400) {
          toast.error(res.message);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  const onWarrantySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('under_warranty', warranty as File);

    await fetch(`${process.env.REACT_APP_BACKENDURL}/users/warrantyupdate/${submitServId}`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_BACKENDURL}`
      },
      body: formdata
    }).then(res => res.json())
      .then(res => {
        // console.log(res);
        if (res.status === 200) {
          toast.success(res.message);
          setwarrty(true);
        }
        else if (res.status === 400) {
          toast.error(res.message);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  const onIssueImgSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    if (issueImg) {
      for (let i = 0; i < issueImg.length; i++) {
        formdata.append('issue_image', issueImg[i]);
      }
    }

    await fetch(`${process.env.REACT_APP_BACKENDURL}/users/issueimgupdate/${submitServId}`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_BACKENDURL}`
      },
      body: formdata
    }).then(res => res.json())
      .then(res => {
        // console.log(res);
        if (res.status === 200) {
          toast.success(res.message);
          setissueimgty(true);
        }
        else if (res.status === 400) {
          toast.error(res.message);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }



  return (
    <>

      <div className="container mx-auto">
        <div className=" text-white vector-bg h-[80px] p-5 flex justify-between items-center">
          <div className='text-2xl font-bold leading-7'>
            Services
          </div>
          <div className="user-icon">
            <svg className="svg-icon w-10 h-10 text-white border border-gray-200 rounded-full" fill='#ffffff' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" /></svg>
          </div>
        </div>

        <div className='p-5'>
          {
            imgUpload ? null :
              <form className="md:w-[50%] w-full mx-auto" onSubmit={onserviceSubmit} >

                <div className="p-3">
                  <div className="text-sm mb-3">Enter some data about your product</div>
                  <div className="mb-5">
                    <select className="form-select text-black" name="brand" defaultValue={'DEFAULT'} value={brand} onChange={handleBrandChange}>
                      <option value="DEFAULT" >Select Brand</option>
                      {
                        allProdData && allProdData.map((item, index) => {
                          return (
                            <option key={index} value={item.name}>{item.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  {selectedBrandData && (
                    <div className="mb-5">
                      <select className="form-select text-black" defaultValue={'DEFAULT'} name="productType" value={category} onChange={handleCategoryChange}>
                        <option value="DEFAULT" >Select Category</option>
                        {selectedBrandData.categories.map((item, index) => (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {selectedCategData && (
                    <div className="mb-5">
                      <select className="form-select text-black" defaultValue={'DEFAULT'} name="productname" value={model} onChange={handleModelChange}>
                        <option value="DEFAULT" >Select Model</option>
                        {selectedCategData.category.map((item, index) => (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mb-5">
                    <select className="form-select text-black" defaultValue={'DEFAULT'} name="warranty" required onChange={(e) => setserviceInp({ ...serviceInp, warranty: e.target.value })}>
                      <option value="DEFAULT" >Select warranty type</option>
                      <option value="Under warranty">Under warranty</option>
                      <option value="Extended warranty">Extended warranty</option>
                      <option value="Out of warranty">Out of warranty</option>
                    </select>
                  </div>

                  <div className="mb-5">
                    <select className="form-select text-black" defaultValue={'DEFAULT'} name="purchaseMode" required onChange={(e) => setserviceInp({ ...serviceInp, purchaseMode: e.target.value })}>
                      <option value="DEFAULT">Select Purchase Mode</option>
                      <option value="Online Purchase">Online Purchase</option>
                      <option value="Offline Purchase">Offline Purchase</option>
                    </select>
                  </div>

                  <div className="mb-5">
                    <input type="text" className="form-control" placeholder='Purchase Date' name='purchase_date' required onChange={(e) => setserviceInp({ ...serviceInp, purchase_date: e.target.value })} />
                  </div>

                  <div className="mb-5">
                    <input type="text" className="form-control" placeholder='Product Serial No' name='set_serialno' required onChange={(e) => setserviceInp({ ...serviceInp, set_serialno: e.target.value })} />
                  </div>

                  <div className="mb-5">
                    <input type="text" className="form-control" placeholder='Query' name='query' required onChange={(e) => setserviceInp({ ...serviceInp, query: e.target.value })} />
                  </div>

                </div>


                <div className="p-3">
                  <div className="text-sm mb-3">Enter some personal data</div>

                  <div className="mb-5">
                    <input type="text" className="form-control" placeholder='First Name' name='firstname' required onChange={(e) => setserviceInp({ ...serviceInp, firstname: e.target.value })} />
                  </div>
                  <div className="mb-5">
                    <input type="text" className="form-control" placeholder='Last Name' name='lastname' required onChange={(e) => setserviceInp({ ...serviceInp, lastname: e.target.value })} />
                  </div>

                  <div className="mb-5">
                    <input type="number" className="form-control" placeholder='Mobile No' name='mobile' required onChange={(e) => setserviceInp({ ...serviceInp, mobile: e.target.value })} />
                  </div>
                  <div className="mb-5">
                    <input type="number" className="form-control" placeholder='Alternate Mobile' name='altmobile' required onChange={(e) => setserviceInp({ ...serviceInp, altmobile: e.target.value })} />
                  </div>

                  <div className="mb-5">
                    <input type="email" className="form-control" placeholder='Email' name='email' required onChange={(e) => setserviceInp({ ...serviceInp, email: e.target.value })} />
                  </div>

                  <div className="mb-5">
                    <input type="text" className="form-control" placeholder='Address' name='address' required onChange={(e) => setserviceInp({ ...serviceInp, address: e.target.value })} />
                  </div>

                  <div className="mb-5">
                    <input type="text" className="form-control" placeholder='City' name='city' required onChange={(e) => setserviceInp({ ...serviceInp, city: e.target.value })} />
                  </div>

                  <div className="mb-5">
                    <input type="text" className="form-control" placeholder='State' name='state' required onChange={(e) => setserviceInp({ ...serviceInp, state: e.target.value })} />
                  </div>

                  <div className="mb-5">
                    <input type="number" className="form-control" placeholder='Pincode' name='pincode' required onChange={(e) => setserviceInp({ ...serviceInp, pincode: e.target.value })} />
                  </div>

                  <div>
                    <button className="btn-primary">Submit & Upload Invoice</button>
                  </div>
                </div>


              </form>
          }


          {
            imgUpload ?
              <>
                <form onSubmit={onInvoiceSubmit} className="md:w-[50%] w-full mx-auto" encType="multipart/form-data" >
                  <div className="mb-3 form-file-upload">
                    <label htmlFor="invoice" className="form-label">Invoice</label>
                    <input type="file" id="invoice" className='form-file' name="invoice" onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setinvoice(e.target.files[0]);
                      }
                    }} />
                  </div>
                  <button className="btn-primary">Upload Invoice</button>

                </form>

                <form onSubmit={onWarrantySubmit} className="md:w-[50%] w-full mx-auto" encType="multipart/form-data" >
                  <div className="mb-3">
                    <label htmlFor="under_warranty" className="form-label">Warranty</label>
                    <input type="file" id="under_warranty" name="under_warranty" onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setwarranty(e.target.files[0]);
                      }
                    }} />
                  </div>

                  <button className="btn-primary">Upload Warranty</button>
                </form>

                <form onSubmit={onIssueImgSubmit} className="md:w-[50%] w-full mx-auto" encType="multipart/form-data" >
                  <div className="mb-3">
                    <label htmlFor="issue_image" className="form-label">Issue Image  (Max upto 4 images)</label>
                    <input type="file" id="issue_image" multiple name="issue_image" onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setissueImg(e.target.files);
                      }
                    }} />
                  </div>

                  <button className="btn-primary">Upload Issue Image</button>
                </form>
              </>
              : null
          }
        </div>
      </div>

      <Thankyou invoicety={invoicety} warrty={warrty} issueimgty={issueimgty} />

    </>
  )
}
