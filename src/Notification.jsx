import React from 'react'

export default function Notic() {



    function requestAndShowPermission() {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                showNotification();
            }
        });
    }
    function showNotification() {
        //  if(document.visibilityState === "visible") {
        //      return;
        //  }
        let title = "Gya";
        let icon = 'https://img.mensxp.com/media/content/2022/Dec/Image-1_Puneet-Kumar_63a2d1d95053c.jpeg'; //this is a large image may take more time to show notifiction, replace with small size icon
        let body = "Ab tu gya betaa, Ab tu gya betaa";

        let notification = new Notification(title, { body, icon });

        notification.onclick = () => {
            notification.close();
            window.parent.focus();
        }

    }

    const notific = () => {
        let permission = Notification.permission;

        if (permission === "granted") {
            showNotification();
        } else if (permission === "default") {
            requestAndShowPermission();
        } else {
            alert("Use normal alert");
        }
    }



    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[200px]'>
                <button onClick={notific} className='btn-primary '>Click</button>

            </div>
        </div>
    )
}
