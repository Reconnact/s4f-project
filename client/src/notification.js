import react from "react";
import { useState, forwardRef, useImperativeHandle } from "react";
import "./notification.css"

const Notification = forwardRef((props, ref) =>{
    const [showNotification, setShowNotification] = useState(false);

    useImperativeHandle(ref, () => ({
        show() {
            setShowNotification(true)
            setTimeout(() => {
                setShowNotification(false)
            }, 3000);
        }
    }));

    return (
    <div className="snackbar" 
        id={showNotification ? "show" : "hide"}
        style={{
            backgroundColor: props.type === 'success' ? "#00F593" : "#FF0033"}}>
        <div className="symbol">
            {props.type === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
        </div>
        <div className="message">{props.message}</div>
    </div>
    );
});

export default Notification;