import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

declare global {
    interface Window {
        google: any;
    }
}

interface GoogleRes {
    credential: string;
}

interface DecodeGooGle {
    name: string;
    email: string;
    picture: string;
}

export default function GoogleLogin() {

    const handleCallbackResponse = async (res: GoogleRes) => {

        const decode: DecodeGooGle = jwtDecode(res.credential)
        if (decode) {
            localStorage.setItem('userimg', decode.picture);
        }

        await fetch(`${process.env.REACT_APP_BACKENDURL}/users/googlelogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(decode)
        }).then(res => res.json())
            .then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('usertoken', res.data.token);
                    toast.success(res.data.message);
                    window.location.href = '/welcome';
                }
                else if (res.data.status === 404) {
                    toast.error(res.data.message);
                }
                else if (res.data.status === 401) {
                    toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        window.onload = function () {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: "681780806935-6nqlr33qj76q7tbddm9hqtific736eon.apps.googleusercontent.com",
                    callback: handleCallbackResponse
                });

                window.google.accounts.id.renderButton(
                    window.document.getElementById("signInDiv"),
                    { theme: "outline", size: "large", width: window.document.getElementById("signInDiv")?.clientWidth, height: 48, shape: "pill" }
                );
                window.google.accounts.id.prompt();
            }
        };


    }, [window.location])

    return (
        <div className="w-full mx-auto" id="signInDiv" />
    )
}
