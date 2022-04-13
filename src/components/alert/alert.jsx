import React,{useEffect} from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// react-bootstrap components
import {
  Alert,
  Badge,
  Button,
  Card,
  Modal,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const { forwardRef, useRef, useImperativeHandle } = React;
const AlertComp = forwardRef((props, ref) => {
    const notificationAlertRef = React.useRef(null);
    useImperativeHandle(ref, () => ({
        notify(place,msg,color){
            var options = {};
            options = {
              place: place,
              message: (
                <div>
                  <div>
                   {msg}
                  </div>
                </div>
              ),
              type: color,
            
              autoDismiss: 7,
            };
            notificationAlertRef.current.notificationAlert(options);
          }
    
      }));
    

    
      return (
          <>
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
          </>
      )


})


export default AlertComp