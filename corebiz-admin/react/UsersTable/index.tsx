import React, { Component } from 'react'
import { Table } from 'vtex.styleguide'
import axios from 'axios'
import { withRuntimeContext } from 'vtex.render-runtime'
import workspaceName from '../workspaceName'

interface Props {
  runtime: any
}

interface IOrder {
  orderId: string;
}

interface IItem {
  additionalInfo: {
    categories: [{
      name: string
    }, {
      name: string
    }?]
  },
  quantity: number
}

interface ILead {
  name: string;
  email: string;
  phone: string;
  dateLead: string;
  formOrigin: string;
  dateClient?: string;
  favoriteCategory?: string;
}
class UsersTable extends Component<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      items: [],
      tableDensity: 'low',
      isLoading: true,
    }
  }

  async componentDidMount() {
    const leads = await this.getLeads() as ILead[];
    const newLeads: ILead[] = [];
    
    Promise.all(
      leads.map(async item => {
        const categories = await this.getCategories(item);
          
        const favoriteCategory = await this.getFavoriteCategory(categories);
  
        newLeads.push({
          name: item.name,
          email: item.email,
          phone: item.phone,
          formOrigin: item.formOrigin,
          dateLead: new Date(item.dateLead).toLocaleDateString(),
          dateClient: item.dateClient ? (new Date(item.dateClient).toLocaleDateString()) : '-',
          favoriteCategory: favoriteCategory,
        })
      })
    ).then(() => {
      this.setState({
        items: newLeads, 
        isLoading: false
      });
    }) 
  }

  private getLeads = async ()  => {
    const response = await axios.get('https://azzk045g2g.execute-api.us-east-2.amazonaws.com/leads');
    return response.data.Items;
  }

  private getCategories = async (item: ILead) => {
    if(item.dateClient){
      const orders = await this.getOrders(item.email);
      const items = await this.getItems(orders);
      return Promise.all(items).then((items) => {
        const categories = this.getCategory(items);
        return categories;
      })
    } else {
      return ['-'];
    }
  }

  private getOrders = async (email: string) => {
    const response = await axios.get(`https://${workspaceName}hiringcoders202112.myvtex.com/api/oms/pvt/orders?q=${email}`);
    return response.data.list as IOrder[];
  }

  private getItems = async (orders: IOrder[]) => {
    return orders.map(async ({orderId})=> {
      const response = await axios.get(`https://${workspaceName}hiringcoders202112.myvtex.com/api/oms/pvt/orders/${orderId}`);
      return response.data.items as IItem[];
    })
  }

  private getCategory = (itemsA: IItem[][]) => {
    const items = itemsA.reduce((acc, val) => acc.concat(val), []);
    return items.map((item) => {
      const info = item.additionalInfo;
      const category = info.categories[1] ?
      info.categories[1].name :
      info.categories[0].name;

      const quant = item.quantity;
      const categories = [];
      for (let index = 0; index < quant; index++) {
        categories.push(category)
      }
      return categories;
    }).reduce((acc, val) => acc.concat(val), []);
  }

  private getFavoriteCategory = async (cats: string[]) => {
    return cats.sort((a,b) =>
    cats.filter(v => v===a).length
    - cats.filter(v => v===b).length
    ).pop();
  }

  private getSchema() {
    const { tableDensity }: any = this.state;

    let fontSize = 'f5'

    switch (tableDensity) {
      case 'low': {
        fontSize = 'f5'
        break
      }
      case 'medium': {
        fontSize = 'f6'
        break
      }
      case 'high': {
        fontSize = 'f7'
        break
      }
      default: {
        fontSize = 'f5'
        break
      }
    }
    return {
      properties: {
        name: {
          title: 'Nome',
        },
        email: {
          title: 'E-mail',
          cellRenderer: ({ cellData }: any) => {
            return <span className="ws-normal">{cellData}</span>
          },
        },
        phone: {
          title: 'Telefone',
          cellRenderer: ({ cellData }: any) => {
            return <span className={`ws-normal ${fontSize}`}>{cellData}</span>
          },
        },
        dateLead: {
          title: 'Data de cadastro',
          cellRenderer: ({ cellData }: any) => {
            return <span className={`ws-normal ${fontSize}`}>{cellData}</span>
          },
        },
        formOrigin: {
          title: 'Origem',
          cellRenderer: ({ cellData }: any) => {
            return <span className={`ws-normal ${fontSize}`}>{cellData}</span>
          },
        },
        dateClient: {
          title: 'Primeira compra',
          cellRenderer: ({ cellData }: any) => {
            return <span className={`ws-normal ${fontSize}`}>{cellData}</span>
          },
        },
        favoriteCategory: {
          title: 'Categoria favorita',
          cellRenderer: ({ cellData }: any) => {
            return <span className={`ws-normal ${fontSize}`}>{cellData}</span>
          },
        },
      },
    }
  }

  public render() {
    const {
      items,
      isLoading,
      tableDensity,
    }: any = this.state

    return (
      <div>
        {!isLoading ? 
        (<Table
          fullWidth
          updateTableKey={tableDensity}
          items={items}
          schema={this.getSchema()}
          density="low"
          
          toolbar={{
            density: {
              buttonLabel: 'Densidade da linha',
              lowOptionLabel: 'Baixa',
              mediumOptionLabel: 'Média',
              highOptionLabel: 'Alta',
              handleCallback: (density: string) =>
                this.setState({ tableDensity: density }),
            },
            fields: {
              label: 'Alternar campos visíveis',
              showAllLabel: 'Mostrar tudo',
              hideAllLabel: 'Ocultar tudo',
            }
          }}
          
        />):
        <p>Carregando...</p>
        }
      </div>
    )
  }
}

export default withRuntimeContext(UsersTable)
