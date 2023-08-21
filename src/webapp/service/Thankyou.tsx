import { useEffect, useState } from "react";

interface ThankuServProps {
  invoicety: boolean;
  warrty: boolean;
  issueimgty: boolean;
}
export default function Thankyou({ invoicety, warrty, issueimgty }: ThankuServProps) {

  const [show, setshow] = useState<boolean>(false)
  useEffect(() => {
    if (invoicety && warrty && issueimgty) {
      setshow(true);
    }
  }, [invoicety, warrty, issueimgty])

  console.log({ invoicety, warrty, issueimgty })

  if (show) {
    setTimeout(window.location.href  = '/welcome', 5000)
    return (
      <div className="absolute top-0 left-0 bg-white w-screen h-screen">
        <div>
          <img src={require('../../assets/img/thanku-img.webp')} className="lg:w-[50%] md:w-[50%] w-full mx-auto" alt="thanku" />
        </div>
        <div className="thanku-text text-center p-5">
          <h2 className="text-lg font-semibold mb-3">Hi User</h2>
          <p className="mb-2">Thank You for submitting your service request.</p>
          <p className="font-semibold">Estimated Time : 2 & 3 Days</p>
        </div>
      </div>
    )
  }
}
