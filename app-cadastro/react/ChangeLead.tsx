import axios from 'axios';
import workspaceName from './workspaceName';

const ChangeLead: StorefrontFunctionComponent = (props) => {

  const order = props.query.og;
  
  axios.get(`https://${workspaceName}--hiringcoders202112.myvtex.com/api/oms/pvt/orders/${order}-01/conversation-message`)
  
  .then(function (response) {
    // handle success
    const email = response.data[0].to[0].email;

    axios.get(`https://azzk045g2g.execute-api.us-east-2.amazonaws.com/leads/${email}`)
  
    .then(function (response) {
      // handle success
      if(response.data.Item.name && !response.data.Item.dateClient){
        let dateClient = new Date();
        axios({
          method: 'patch',
          url: `https://azzk045g2g.execute-api.us-east-2.amazonaws.com/leads/${email}`,
          data: {
            dateClient,
          }
        });
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  return null
}
export default ChangeLead