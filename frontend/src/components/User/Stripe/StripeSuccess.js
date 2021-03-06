import React, { useEffect } from 'react'
import {useSelector} from 'react-redux';
import { Grid, CircularProgress } from "@material-ui/core";
import {stripeSuccessRequest} from '../../../actions/stripeAction';

const StripeSuccess = ({match, history}) => {

    const {auth} = useSelector((state) =>({...state}));
    useEffect(() => {
        stripeSuccessRequest(auth.token, match.params.serviceId)
            .then((res) => {
                if(res.data.success) {
                  // console.log("STRIPE SUCCESS RESPONSE ===>", res.data);
                  history.push("/dashboard");
                } else{
                  history.push("stripe/cancel");
                }
            })
    }, [match.params.serviceId, auth.token, history])

    return (
        <Grid container alignItems="stretch" spacing={3}>
            <h1
            style={{marginLeft: '35%', marginTop: '12%'}}
            >
            Your Payment is successfull...
            </h1>
            <br/><br/>

            <CircularProgress disableShrink style={{marginLeft: '45%', marginTop: '18px'}}/>
        </Grid>
    )
}

export default StripeSuccess;
