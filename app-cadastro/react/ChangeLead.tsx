import { useEffect } from 'react';
import axios from 'axios';
import workspaceName from './workspaceName';

const ChangeLead: StorefrontFunctionComponent = (props) => {

  const order = props.query.og;
  
  useEffect(() => {
    try {
      setTimeout(updateLead, 1500);
    } catch (error) {
      console.error(error);
    }
  },[])

  async function updateLead() {
    const messages = await axios.get(`https://${workspaceName}hiringcoders202112.myvtex.com/api/oms/pvt/orders/${order}-01/conversation-message`);
    const email = messages.data[0].to[0].email;

    const lead = await axios.get(`https://azzk045g2g.execute-api.us-east-2.amazonaws.com/leads/${email}`);

    if(lead.data.Item.name && !lead.data.Item.dateClient){
      let dateClient = new Date();
      await axios({
        method: 'patch',
        url: `https://azzk045g2g.execute-api.us-east-2.amazonaws.com/leads/${email}`,
        data: {
          dateClient,
        }
      });
    };
  }

  return null
}
export default ChangeLead