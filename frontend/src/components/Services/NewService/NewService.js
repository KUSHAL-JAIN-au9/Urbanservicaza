import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import {createService} from '../../../actions/serviceActions';
import NewServiceForm from './NewServiceForm';


const NewService = () => {

    const { userInfo } = useSelector((state) => state.userLogin);
    const [values, setValues] = useState({
        title: '',
        content: '',
        image: '',
        price: '',
        from: '',
        to: '',
        option: '',
        total: ''
    });

    const [location, setLocation] = useState("");

    const clear = () => {
        setValues({ title: "", content: "", image: "", price: "", from: "", to: "", option: "", total: ""  });
        setLocation("")
    };

    const handleSubmit = async (e) => {
        try{
            e.preventDefault()
            let res = await createService(userInfo.token, {...values, location, postedBy: userInfo.email, postedBySeller: userInfo.name});
            // console.log("NEW SERVICE ====>", res)
            toast.success("Your New Service is Posted Successfully...")
            clear();
        } catch(err){
            toast.error(err.response.data)
        }

    };

    return (
        <NewServiceForm
        values={values}
        setValues={setValues}
        location={location}
        setLocation={setLocation}
        handleSubmit={handleSubmit}
        clear={clear}
        />
    );
};

export default NewService;