import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1> Info Page</h1>
        <p> The details are : {props.info} </p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin &&  <p> This is a private meassage. Dont share!</p>}
            <WrappedComponent { ...props}  />
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin ?  <WrappedComponent { ...props}  /> : <p>Please log in to view the details  </p>}
        </div>
    );
}

const AdminInfo = withAdminWarning(Info);
const RequireAuth = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin = { false} info='Information via Props' />, document.getElementById("app"));
ReactDOM.render(<RequireAuth isAdmin = { true} info='Information via Props' />, document.getElementById("app"));